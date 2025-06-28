
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Dashboard } from "@/components/Dashboard";
import { useState } from "react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <div className="p-6">Inventory Overview (Coming Soon)</div>;
      case 'forecasts':
        return <div className="p-6">Forecasts (Coming Soon)</div>;
      case 'transfers':
        return <div className="p-6">Transfer Suggestions (Coming Soon)</div>;
      case 'map':
        return <div className="p-6">Map View (Coming Soon)</div>;
      case 'settings':
        return <div className="p-6">Settings (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader currentPage={currentPage} />
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
