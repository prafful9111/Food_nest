import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserPlus, MapPin, Package, ClipboardList } from "lucide-react";
import SupervisorOverview from "@/components/supervisor/SupervisorOverview";
import AssignRider from "@/components/supervisor/AssignRider";
import ViewRoutes from "@/components/supervisor/ViewRoutes";
import ViewInventory from "@/components/supervisor/ViewInventory";
import RiderLogs from "@/components/supervisor/RiderLogs";

const sidebarItems = [
  {
    title: "Overview",
    href: "",
    icon: ClipboardList,
  },
  {
    title: "Assign Rider",
    href: "/assign-rider",
    icon: UserPlus,
  },
  {
    title: "View Routes",
    href: "/routes",
    icon: MapPin,
  },
  {
    title: "View Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Rider Logs",
    href: "/rider-logs",
    icon: ClipboardList,
  },
];

const SupervisorDashboard = () => {
  return (
    <DashboardLayout
      userName="Supervisor Jane"
      userRole="Supervisor"
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      basePath="/supervisor"
    >
      <Routes>
        <Route path="/" element={<SupervisorOverview />} />
        <Route path="/assign-rider" element={<AssignRider />} />
        <Route path="/routes" element={<ViewRoutes />} />
        <Route path="/inventory" element={<ViewInventory />} />
        <Route path="/rider-logs" element={<RiderLogs />} />
        <Route path="*" element={<Navigate to="/supervisor" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SupervisorDashboard;