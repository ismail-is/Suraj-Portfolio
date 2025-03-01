
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const DashboardNav = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Marketing Dashboard</h1>
        
        <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardNav;
