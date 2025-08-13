import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Users, Package, AlertCircle } from "lucide-react";
import SOSButton from "../rider/SOSButton";

const SupervisorOverview = () => {
  const stats = [
    { title: "Active Riders", value: "6", icon: Users, color: "text-primary" },
    { title: "Routes Today", value: "8", icon: Truck, color: "text-success" },
    { title: "Inventory Alerts", value: "3", icon: AlertCircle, color: "text-warning" },
    { title: "Total Orders", value: "124", icon: Package, color: "text-accent" },
  ];

  const activeRiders = [
    { name: "John Smith", route: "Downtown A", status: "Active", location: "Central Park", sales: "฿245" },
    { name: "Mike Davis", route: "Suburban B", status: "Active", location: "Shopping Mall", sales: "฿189" },
    { name: "Sarah Johnson", route: "Beach C", status: "On Break", location: "Marina", sales: "฿156" },
  ];

  const recentAlerts = [
    { type: "Low Stock", message: "Burger patties running low in Downtown A", time: "10 min ago", severity: "high" },
    { type: "Request", message: "Mike requested additional chicken breast", time: "25 min ago", severity: "medium" },
    { type: "Route", message: "Beach C route completed early", time: "1 hour ago", severity: "low" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Supervisor Dashboard</h1>
        <p className="text-muted-foreground">Monitor operations and manage your team</p>
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

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Active Riders</CardTitle>
            <CardDescription>Current rider status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRiders.map((rider) => (
                <div key={rider.name} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{rider.name}</p>
                    <p className="text-muted-foreground text-sm">{rider.route} • {rider.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={rider.status === "Active" ? "default" : "secondary"}
                      className={rider.status === "Active" ? "bg-success" : ""}
                    >
                      {rider.status}
                    </Badge>
                    <p className="mt-1 font-medium text-sm">{rider.sales}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Important notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant="outline"
                          className={
                            alert.severity === "high" ? "border-destructive text-destructive" :
                            alert.severity === "medium" ? "border-warning text-warning" :
                            "border-success text-success"
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                    <span className="text-muted-foreground text-xs">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupervisorOverview;