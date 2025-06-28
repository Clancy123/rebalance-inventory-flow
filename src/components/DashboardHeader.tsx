
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  currentPage: string;
}

export function DashboardHeader({ currentPage }: DashboardHeaderProps) {
  const getPageTitle = (page: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      inventory: "Inventory Overview",
      forecasts: "Forecasts",
      transfers: "Transfer Suggestions",
      map: "Map View",
      settings: "Settings"
    };
    return titles[page] || "Dashboard";
  };

  const getBreadcrumb = (page: string) => {
    return `Home / ${getPageTitle(page)}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <nav className="text-sm text-gray-500 mb-1">
            {getBreadcrumb(currentPage)}
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle(currentPage)}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-gray-700 font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
