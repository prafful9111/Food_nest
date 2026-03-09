import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, User, LogOut, Settings, Menu } from "lucide-react";
import ShiftManager from "@/components/ui/ShiftManager";
import { BackButton } from '@/components/ui/BackButton';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
  onToggleSidebar?: () => void;
}

export function DashboardHeader({ userName, userRole, userAvatar, onToggleSidebar }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isShiftActive, setIsShiftActive] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleShiftEnd = (reason?: string) => {
    setIsShiftActive(false);
    console.log("Shift ended:", reason);
  };

  return (
    <header className="bg-card px-3 sm:px-6 py-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onToggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="bg-clip-text bg-gradient-primary font-bold text-transparent text-xl sm:text-2xl">
              Food-Nest
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">{userRole} Dashboard</p>
          </div>
        </div>
         <BackButton /> 
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Show shift manager for non-SuperAdmin roles */}
          {userRole !== "Super Administrator" && (
            <div className="hidden sm:block">
              <ShiftManager 
                userRole={userRole}
                isShiftActive={isShiftActive}
                onShiftEnd={handleShiftEnd}
              />
            </div>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
            <Moon className="absolute w-[1.2rem] h-[1.2rem] rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full w-10 h-10">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="font-medium text-sm leading-none">{userName}</p>
                <p className="text-muted-foreground text-xs leading-none">{userRole}</p>
              </div>
              <DropdownMenuItem>
                <User className="mr-2 w-4 h-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 w-4 h-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}