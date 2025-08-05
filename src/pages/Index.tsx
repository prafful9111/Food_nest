import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Crown, Users, Truck, ChefHat } from "lucide-react";

const userRoles = [
  {
    id: "superadmin",
    title: "Super Admin",
    description: "Manage users, routes, food items, and analytics",
    icon: Crown,
    path: "/superadmin",
    color: "bg-gradient-primary"
  },
  {
    id: "supervisor",
    title: "Supervisor",
    description: "Assign riders, monitor routes, and track inventory",
    icon: Users,
    path: "/supervisor",
    color: "bg-gradient-success"
  },
  {
    id: "rider",
    title: "Rider",
    description: "View routes, manage inventory, and log sales",
    icon: Truck,
    path: "/rider",
    color: "bg-accent"
  },
  {
    id: "cook",
    title: "Cook",
    description: "Manage menu, track food prep, and request materials",
    icon: ChefHat,
    path: "/cook",
    color: "bg-warning"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-gradient-card p-6 min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="bg-clip-text bg-gradient-primary mb-4 font-bold text-transparent text-5xl">
            Food-Nest
          </h1>
          <p className="text-muted-foreground text-xl">
            Complete Food Cart Management System
          </p>
          <p className="mt-2 text-muted-foreground">
            Select your role to access your dashboard
          </p>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {userRoles.map((role) => (
            <Card key={role.id} className="group hover:shadow-warm border-2 hover:border-primary/20 transition-all duration-300 cursor-pointer">
              <CardHeader className="pb-4 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate(role.path)}
                  variant="outline"
                >
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Demo application - All data is simulated for testing purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;