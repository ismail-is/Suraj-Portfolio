
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ContentProvider>
      <App />
    </ContentProvider>
  </AuthProvider>
);
