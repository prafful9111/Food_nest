import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
  userAvatar?: string;
  sidebarItems: SidebarItem[];
  basePath: string;
}

export function DashboardLayout({
  children,
  userName,
  userRole,
  userAvatar,
  sidebarItems,
  basePath
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        userName={userName} 
        userRole={userRole} 
        userAvatar={userAvatar}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex h-[calc(100vh-73px)]">
        <DashboardSidebar 
          items={sidebarItems} 
          basePath={basePath}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}