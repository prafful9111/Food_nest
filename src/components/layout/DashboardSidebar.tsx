import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  basePath: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ items, basePath, isOpen = false, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden z-40 fixed inset-0 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "flex flex-col bg-card border-r w-64 h-full transition-transform duration-300 ease-in-out",
        "md:translate-x-0 md:static md:z-auto",
        isOpen ? "translate-x-0 fixed z-50" : "-translate-x-full fixed z-50 md:relative"
      )}>
        {/* Mobile close button */}
        <div className="md:hidden flex justify-between items-center p-4">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 py-6 overflow-auto">
          <nav className="space-y-2 px-4">
            {items.map((item) => (
              <NavLink
                key={item.href}
                to={`${basePath}${item.href}`}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors",
                    isActive
                      ? "bg-gradient-primary text-white shadow-warm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                {/* Only replace $ with ฿ for title or text */}
                <item.icon className="w-4 h-4" />
                {item.title.replace('$', '฿')}  {/* Replace only $ in the title */}
              </NavLink>
            ))}


          </nav>
        </div>
      </div>
    </>
  );
}