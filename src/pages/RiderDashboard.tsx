import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MapPin, Package, DollarSign, Plus } from "lucide-react";
import RiderOverview from "@/components/rider/RiderOverview";
import MyRoute from "@/components/rider/MyRoute";
import MyInventory from "@/components/rider/MyInventory";
import LogSales from "@/components/rider/LogSales";
import RequestMore from "@/components/rider/RequestMore";

const sidebarItems = [
  {
    title: "Overview",
    href: "",
    icon: Package,
  },
  {
    title: "My Route",
    href: "/route",
    icon: MapPin,
  },
  {
    title: "My Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Log Sales",
    href: "/log-sales",
    icon: MapPin,
  },
  {
    title: "Request More",
    href: "/request",
    icon: Plus,
  },
];

const RiderDashboard = () => {
  return (
    <DashboardLayout
      userName="Rider Mike"
      userRole="Food Cart Rider"
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      basePath="/rider"
    >
      <Routes>
        <Route path="/" element={<RiderOverview />} />
        <Route path="/route" element={<MyRoute />} />
        <Route path="/inventory" element={<MyInventory />} />
        <Route path="/log-sales" element={<LogSales />} />
        <Route path="/request" element={<RequestMore />} />
        <Route path="*" element={<Navigate to="/rider" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default RiderDashboard;