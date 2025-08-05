import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, MapPin, UtensilsCrossed, Package, BarChart3, UsersRound, Combine, Truck, UserCheck } from "lucide-react";
import SuperAdminOverview from "@/components/superadmin/SuperAdminOverview";
import UserManagement from "@/components/superadmin/UserManagement";
import FoodItems from "@/components/superadmin/FoodItems";
import RoutesManagement from "@/components/superadmin/RoutesManagement";
import Inventory from "@/components/superadmin/Inventory";
import Analytics from "@/components/superadmin/Analytics";
import TeamManagement from "@/components/superadmin/TeamManagement";
import CombosManagement from "@/components/superadmin/CombosManagement";
import VehiclesManagement from "@/components/superadmin/VehiclesManagement";
import RiderAssignment from "@/components/superadmin/RiderAssignment";
import { BackButton } from '@/components/ui/BackButton';

const sidebarItems = [
  {
    title: "Overview",
    href: "",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Team",
    href: "/team",
    icon: UsersRound,
  },
  {
    title: "Assign Rider",
    href: "/assign-rider",
    icon: UserCheck,
  },
  {
    title: "Routes",
    href: "/routes",
    icon: MapPin,
  },
  {
    title: "Food Items",
    href: "/food-items",
    icon: UtensilsCrossed,
  },
  {
    title: "Combos",
    href: "/combos",
    icon: Combine,
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    icon: Truck,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout
      userName="Admin User"
      userRole="Super Administrator"
      userAvatar="/api/placeholder/40/40"
      sidebarItems={sidebarItems}
      basePath="/superadmin"
    >
      <Routes>
        <Route path="/" element={<SuperAdminOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/team" element={<TeamManagement />} />
        <Route path="/assign-rider" element={<RiderAssignment />} />
        <Route path="/routes" element={<RoutesManagement />} />
        <Route path="/food-items" element={<FoodItems />} />
        <Route path="/combos" element={<CombosManagement />} />
        <Route path="/vehicles" element={<VehiclesManagement />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/superadmin" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;