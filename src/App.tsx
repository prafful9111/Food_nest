import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import CookDashboard from "./pages/CookDashboard";
import NotFound from "./pages/NotFound";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="food-cart-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div>
            {/* Language Switcher added globally */}
         
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
            <Route path="/supervisor/*" element={<SupervisorDashboard />} />
            <Route path="/rider/*" element={<RiderDashboard />} />
            <Route path="/cook/*" element={<CookDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
            </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;