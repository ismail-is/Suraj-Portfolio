
/**
 * Utility functions for interacting with Google Sheets as a simple database
 */

// The URL format for accessing Google Sheets as JSON
// Format: https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json&sheet=SHEET_NAME
// Note: The sheet must be published to the web and accessible to anyone with the link

export interface SheetVideoContent {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  isShort: boolean;
}

export interface SheetPostContent {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Parse the Google Sheets JSON response (which is not standard JSON)
const parseGoogleSheetsData = (responseText: string): any => {
  // The response is wrapped in a weird format like "/*O_o*/google.visualization.Query.setResponse({...});"
  // We need to extract just the JSON part
  const jsonRegex = /google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/;
  const match = responseText.match(jsonRegex);
  
  if (!match || !match[1]) {
    console.error("Failed to parse Google Sheets response", responseText);
    throw new Error("Invalid response format from Google Sheets");
  }
  
  return JSON.parse(match[1]);
};

// Extract row data from the parsed Google Sheets response
const extractRowData = (parsedResponse: any): any[] => {
  if (!parsedResponse.table || !parsedResponse.table.rows) {
    return [];
  }
  
  const headers = parsedResponse.table.cols.map((col: any) => col.label);
  
  return parsedResponse.table.rows.map((row: any) => {
    const rowData: any = {};
    
    headers.forEach((header: string, index: number) => {
      // Skip empty header columns
      if (!header) return;
      
      // Get the value, handling null/undefined values
      const cell = row.c[index];
      rowData[header] = cell ? (cell.v !== null && cell.v !== undefined ? cell.v : '') : '';
    });
    
    return rowData;
  });
};

// Fetch data from a Google Sheet
export const fetchSheetData = async (sheetId: string, sheetName: string): Promise<any[]> => {
  try {
    // Construct the URL to get the sheet data as JSON
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Sheets: ${response.status}`);
    }
    
    const responseText = await response.text();
    const parsedResponse = parseGoogleSheetsData(responseText);
    
    return extractRowData(parsedResponse);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
};

// Transform raw sheet data to VideoContent array
export const transformToVideos = (sheetData: any[]): SheetVideoContent[] => {
  return sheetData.map(row => ({
    id: row.id?.toString() || '',
    title: row.title || '',
    description: row.description || '',
    url: row.url || '',
    thumbnail: row.thumbnail || '',
    isShort: Boolean(row.isShort === 'TRUE' || row.isShort === true)
  }));
};

// Transform raw sheet data to PostContent array
export const transformToPosts = (sheetData: any[]): SheetPostContent[] => {
  return sheetData.map(row => ({
    id: parseInt(row.id) || Date.now(),
    title: row.title || '',
    description: row.description || '',
    image: row.image || ''
  }));
};

// Since we can't directly update the Google Sheet from the client side without authentication,
// we'll provide instructions for manual updates
export const getSheetUpdateInstructions = (): string => {
  return `
    To update your portfolio content:
    
    1. Open your Google Sheet
    2. Add or edit rows as needed
    3. Ensure columns match expected format (id, title, description, etc.)
    4. Make sure the sheet is published to the web
    5. Refresh this page to see your changes
  `;
};
