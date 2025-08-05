import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, DollarSign, Users, MapPin } from "lucide-react";

const Analytics = () => {
  const salesData = [
    { period: "Today", sales: "฿1,234", orders: 45, avg: "฿27.42" },
    { period: "This Week", sales: "฿8,567", orders: 312, avg: "฿27.46" },
    { period: "This Month", sales: "฿34,890", orders: 1247, avg: "฿27.98" },
  ];

  const topPerformers = [
    { name: "Classic Burger", sales: 145, revenue: "฿1,305" },
    { name: "Chicken Tacos", sales: 132, revenue: "฿858" },
    { name: "Fish & Chips", sales: 98, revenue: "฿979" },
    { name: "Caesar Salad", sales: 76, revenue: "฿607" },
  ];

  const riderPerformance = [
    { name: "John Smith", route: "Downtown A", sales: "฿2,456", efficiency: "95%" },
    { name: "Mike Davis", route: "Suburban B", sales: "฿2,123", efficiency: "92%" },
    { name: "Sarah Johnson", route: "Beach C", sales: "฿1,890", efficiency: "88%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Business insights and performance metrics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
            {salesData.map((data) => (
              <Card key={data.period} className="bg-gradient-card shadow-card">
                <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                  <CardTitle className="font-medium text-sm">{data.period}</CardTitle>
                  {/* Replace DollarSign with Thai Baht (฿) */}
                  <span className="text-muted-foreground">฿</span>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-primary text-2xl">{data.sales}</div>
                  <p className="text-muted-foreground text-xs">
                    {data.orders} orders • Avg: {data.avg}
                  </p>
                </CardContent>
              </Card>

            ))}
          </div>

          <div className="gap-6 grid lg:grid-cols-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sales Trend
                </CardTitle>
                <CardDescription>Revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center bg-muted rounded-lg h-[200px]">
                  <p className="text-muted-foreground">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Route Performance
                </CardTitle>
                <CardDescription>Sales by route</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riderPerformance.map((rider) => (
                    <div key={rider.name} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{rider.name}</p>
                        <p className="text-muted-foreground text-sm">{rider.route}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{rider.sales}</p>
                        <p className="text-success text-sm">{rider.efficiency}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed sales breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center bg-muted rounded-lg h-[400px]">
                <p className="text-muted-foreground">Detailed sales charts would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Best selling items and revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((item, index) => (
                  <div key={item.name} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-primary rounded-full w-8 h-8 font-bold text-white text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">{item.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{item.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Rider and route efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riderPerformance.map((rider) => (
                  <div key={rider.name} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{rider.name}</h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{rider.route}</span>
                      </div>
                    </div>
                    <div className="gap-4 grid grid-cols-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sales</p>
                        <p className="font-bold text-primary">{rider.sales}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-bold text-success">{rider.efficiency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;