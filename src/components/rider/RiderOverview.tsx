import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Package, MapPin, TrendingUp } from "lucide-react";

const RiderOverview = () => {
  const todayStats = {
    sales: "฿245.50",
    orders: 18,
    items: 42,
    route: "Downtown A"
  };

  const salesData = [
    { period: "Today", amount: "฿245.50", orders: 18 },
    { period: "This Week", amount: "฿1,234.75", orders: 89 },
    { period: "This Month", amount: "฿4,567.25", orders: 312 },
  ];

  const currentInventory = [
    { name: "Classic Burger", remaining: 8, assigned: 20, status: "low" },
    { name: "Chicken Tacos", remaining: 7, assigned: 15, status: "good" },
    { name: "Fish & Chips", remaining: 4, assigned: 10, status: "critical" },
    { name: "Caesar Salad", remaining: 5, assigned: 8, status: "good" },
  ];

  const recentSales = [
    { item: "Classic Burger", quantity: 2, amount: "฿17.98", time: "12:30 PM", location: "Central Park" },
    { item: "Chicken Tacos", quantity: 1, amount: "฿6.50", time: "12:15 PM", location: "Business District" },
    { item: "Fish & Chips", quantity: 1, amount: "฿9.99", time: "12:00 PM", location: "City Hall" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'low': return 'bg-warning';
      case 'good': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Rider Dashboard</h1>
        <p className="text-muted-foreground">Track your sales and manage your cart</p>
      </div>

      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Today's Sales</CardTitle>
            <span className="w-4 h-4 text-green-400">฿</span>

          </CardHeader>
          <CardContent>
            <div className="font-bold text-success text-2xl">{todayStats.sales}</div>
            <p className="text-muted-foreground text-xs">
              {todayStats.orders} orders completed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Items Sold</CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{todayStats.items}</div>
            <p className="text-muted-foreground text-xs">
              Items sold today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Current Route</CardTitle>
            <MapPin className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{todayStats.route}</div>
            <p className="text-muted-foreground text-xs">
              Active route assignment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Avg per Order</CardTitle>
            <TrendingUp className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              ฿{(parseFloat(todayStats.sales.replace('$', '฿')) / todayStats.orders).toFixed(2)}
            </div>
            <p className="text-muted-foreground text-xs">
              Average order value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
            <CardDescription>Your performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data) => (
                <div key={data.period} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{data.period}</p>
                    <p className="text-muted-foreground text-sm">{data.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{data.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
            <CardDescription>Items remaining in your cart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentInventory.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {item.remaining}/{item.assigned} remaining
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(item.status)}
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSales.map((sale, index) => (
              <div key={index} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                <div>
                  <p className="font-medium">{sale.item}</p>
                  <p className="text-muted-foreground text-sm">
                    Qty: {sale.quantity} • {sale.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">{sale.amount}</p>
                  <p className="text-muted-foreground text-xs">{sale.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderOverview;