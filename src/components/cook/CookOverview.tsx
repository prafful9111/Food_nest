import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Package, Star } from "lucide-react";
import SOSButton from "../rider/SOSButton";

const CookOverview = () => {
  const stats = [
    { title: "Menu Items", value: "12", icon: ChefHat, color: "text-primary" },
    { title: "In Preparation", value: "4", icon: Clock, color: "text-warning" },
    { title: "Ready to Pick", value: "8", icon: Package, color: "text-success" },
    { title: "Today's Special", value: "2", icon: Star, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Cook Dashboard</h1>
        <p className="text-muted-foreground">Manage your kitchen operations</p>
      </div>
    <SOSButton />
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CookOverview;