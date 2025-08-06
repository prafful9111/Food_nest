import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MapPin, Package, AlertTriangle, TrendingUp } from "lucide-react";

const SuperAdminOverview = () => {
  const analytics = [
    {
      title: "Total Sales",
      value: "฿12,450 ",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Active Routes",
      value: "8",
      change: "+2",
      icon: MapPin,
      color: "text-primary"
    },
    {
      title: "Inventory Low",
      value: "5",
      change: "Alert",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Food Requests",
      value: "12",
      change: "+4",
      icon: Package,
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-foreground text-3xl">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your food cart operations</p>
      </div>

      <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {analytics.map((item) => (
          <Card key={item.title} className="bg-gradient-card shadow-card hover:shadow-warm transition-shadow">
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {item.title === "Total Sales" ? (
                  <>
                    {item.value}
                    <span className="ml-2 text-muted-foreground text-sm">
                      INR {(parseFloat(item.value.replace('฿', '').replace(',', '')) * 2.5).toFixed(0)}
                    </span>
                  </>
                ) : (
                  item.value
                )}
              </div>
              <p className={`text-xs ${item.color}`}>
                {item.change} from last week
              </p>
            </CardContent>




          </Card>
        ))}
      </div>

      <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">New rider assigned</p>
                  <p className="text-muted-foreground text-sm">Mike Johnson - Route A</p>
                </div>
                <span className="text-muted-foreground text-xs">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Inventory alert</p>
                  <p className="text-muted-foreground text-sm">Burger patties running low</p>
                </div>
                <span className="text-muted-foreground text-xs">4 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Food item added</p>
                  <p className="text-muted-foreground text-sm">Chicken Tacos - Menu</p>
                </div>
                <span className="text-muted-foreground text-xs">6 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Stats
            </CardTitle>
            <CardDescription>System performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Users</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Active Carts</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Menu Items</span>
                <span className="font-bold">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Routes</span>
                <span className="font-bold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminOverview;