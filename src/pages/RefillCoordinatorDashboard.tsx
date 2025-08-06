import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Package, ClipboardList, Users, BarChart3 } from "lucide-react";
import RefillCoordinatorOverview from "@/components/refill-coordinator/RefillCoordinatorOverview";
import RefillRequests from "@/components/refill-coordinator/RefillRequests";
import InventoryStatus from "@/components/refill-coordinator/InventoryStatus";
import CookCoordination from "@/components/refill-coordinator/CookCoordination";

const sidebarItems = [
  {
    title: "Overview",
    href: "",
    icon: BarChart3,
  },
  {
    title: "Refill Requests",
    href: "/refill-requests",
    icon: ClipboardList,
  },
  {
    title: "Inventory Status",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Cook Coordination",
    href: "/cook-coordination",
    icon: Users,
  },
];

const RefillCoordinatorDashboard = () => {
  return (
    <DashboardLayout
      userName="Coordinator Alex"
      userRole="Refill Coordinator"
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      basePath="/refill-coordinator"
    >
      <Routes>
        <Route path="/" element={<RefillCoordinatorOverview />} />
        <Route path="/refill-requests" element={<RefillRequests />} />
        <Route path="/inventory" element={<InventoryStatus />} />
        <Route path="/cook-coordination" element={<CookCoordination />} />
        <Route path="*" element={<Navigate to="/refill-coordinator" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default RefillCoordinatorDashboard;