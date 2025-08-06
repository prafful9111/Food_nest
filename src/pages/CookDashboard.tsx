import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UtensilsCrossed, Clock, Package, Star } from "lucide-react";
import CookOverview from "@/components/cook/CookOverview";
import MyMenu from "@/components/cook/MyMenu";
import FoodPrepStatus from "@/components/cook/FoodPrepStatus";
import RawMaterialRequests from "@/components/cook/RawMaterialRequests";
import RiderRequests from "@/components/cook/RiderRequests";
import Specials from "@/components/cook/Specials";

const sidebarItems = [
  {
    title: "Overview",
    href: "",
    icon: UtensilsCrossed,
  },
  {
    title: "My Menu",
    href: "/menu",
    icon: UtensilsCrossed,
  },
  {
    title: "Food Prep Status",
    href: "/prep-status",
    icon: Clock,
  },
  {
    title: "Raw Materials",
    href: "/raw-materials",
    icon: Package,
  },
  {
    title: "Rider Requests",
    href: "/rider-requests",
    icon: UtensilsCrossed,
  },
  {
    title: "Specials",
    href: "/specials",
    icon: Star,
  },
];

const CookDashboard = () => {
  return (
    <DashboardLayout
      userName="Chef Sarah"
      userRole="Cook"
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      basePath="/cook"
    >
      <Routes>
        <Route path="/" element={<CookOverview />} />
        <Route path="/menu" element={<MyMenu />} />
        <Route path="/prep-status" element={<FoodPrepStatus />} />
        <Route path="/raw-materials" element={<RawMaterialRequests />} />
        <Route path="/rider-requests" element={<RiderRequests />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="*" element={<Navigate to="/cook" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CookDashboard;