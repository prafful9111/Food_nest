import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { PublicRoute } from "./components/layout/PublicRoute";
import Index from "./pages/Index";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import CookDashboard from "./pages/CookDashboard";
import NotFound from "./pages/NotFound";
import RefillCoordinatorDashboard from "./pages/RefillCoordinatorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="food-cart-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div>
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Index />} />
                </Route>
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["Superadmin"]} />}>
                  <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
                </Route>
                
                <Route element={<ProtectedRoute allowedRoles={["Supervisor"]} />}>
                  <Route path="/supervisor/*" element={<SupervisorDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["Rider"]} />}>
                  <Route path="/rider/*" element={<RiderDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["Cook"]} />}>
                  <Route path="/cook/*" element={<CookDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["Refill Coordinator"]} />}>
                  <Route path="/refill-coordinator/*" element={<RefillCoordinatorDashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;