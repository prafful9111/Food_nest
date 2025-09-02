import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Users, MapPin, Car, Battery, AlertTriangle } from "lucide-react";

const Analytics = () => {
  const salesData = [
    { period: "Today", sales: "$1,234", orders: 45, avg: "$27.42" },
    { period: "This Week", sales: "$8,567", orders: 312, avg: "$27.46" },
    { period: "This Month", sales: "$34,890", orders: 1247, avg: "$27.98" },
  ];

  const topPerformers = [
    { name: "Classic Burger", sales: 145, revenue: "$1,305" },
    { name: "Chicken Tacos", sales: 132, revenue: "$858" },
    { name: "Fish & Chips", sales: 98, revenue: "$979" },
    { name: "Caesar Salad", sales: 76, revenue: "$607" },
  ];

  const riderPerformance = [
    { name: "John Smith", route: "Downtown A", sales: "$2,456", efficiency: "95%" },
    { name: "Mike Davis", route: "Suburban B", sales: "$2,123", efficiency: "92%" },
    { name: "Sarah Johnson", route: "Beach C", sales: "$1,890", efficiency: "88%" },
  ];

  const salesRecords = {
    byFoodItem: [
      { item: "Classic Burger", quantity: 145, revenue: "$1,305", date: "2024-01-15", time: "12:30 PM" },
      { item: "Chicken Tacos", quantity: 132, revenue: "$858", date: "2024-01-15", time: "1:45 PM" },
      { item: "Fish & Chips", quantity: 98, revenue: "$979", date: "2024-01-15", time: "2:15 PM" },
      { item: "Caesar Salad", quantity: 76, revenue: "$607", date: "2024-01-15", time: "11:20 AM" },
    ],
    byRoute: [
      { route: "Downtown A", rider: "John Smith", sales: "$2,456", orders: 89, date: "2024-01-15" },
      { route: "Suburban B", rider: "Mike Davis", sales: "$2,123", orders: 76, date: "2024-01-15" },
      { route: "Beach C", rider: "Sarah Johnson", sales: "$1,890", orders: 68, date: "2024-01-15" },
    ],
    byTeam: [
      { team: "Team Alpha", members: 4, totalSales: "$8,945", avgPerMember: "$2,236", efficiency: "94%" },
      { team: "Team Beta", members: 3, totalSales: "$6,234", avgPerMember: "$2,078", efficiency: "89%" },
      { team: "Team Gamma", members: 5, totalSales: "$9,876", avgPerMember: "$1,975", efficiency: "87%" },
    ],
    byRider: [
      { rider: "John Smith", route: "Downtown A", sales: "$2,456", orders: 89, hours: "8.5", avgPerHour: "$289" },
      { rider: "Mike Davis", route: "Suburban B", sales: "$2,123", orders: 76, hours: "8.0", avgPerHour: "$265" },
      { rider: "Sarah Johnson", route: "Beach C", sales: "$1,890", orders: 68, hours: "7.5", avgPerHour: "$252" },
    ]
  };

  const vehiclesData = {
    vehicles: [
      { id: "V001", type: "Electric Cart", status: "Active", batteryLevel: "85%", location: "Downtown A", lastService: "2024-01-10" },
      { id: "V002", type: "Electric Cart", status: "Maintenance", batteryLevel: "20%", location: "Workshop", lastService: "2024-01-05" },
      { id: "V003", type: "Electric Bike", status: "Active", batteryLevel: "92%", location: "Suburban B", lastService: "2024-01-12" },
      { id: "V004", type: "Electric Cart", status: "Idle", batteryLevel: "67%", location: "Beach C", lastService: "2024-01-08" },
    ],
    batteries: [
      { imei: "356938035643809", vehicle: "V001", status: "Good", charge: "85%", health: "98%", lastCharge: "2 hours ago" },
      { imei: "356938035643810", vehicle: "V002", status: "Low", charge: "20%", health: "75%", lastCharge: "8 hours ago" },
      { imei: "356938035643811", vehicle: "V003", status: "Excellent", charge: "92%", health: "100%", lastCharge: "1 hour ago" },
      { imei: "356938035643812", vehicle: "V004", status: "Good", charge: "67%", health: "89%", lastCharge: "4 hours ago" },
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Business insights and performance metrics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="sales" className="text-xs sm:text-sm">Sales</TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm">Products</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
          <TabsTrigger value="vehicles" className="col-span-2 sm:col-span-1 text-xs sm:text-sm">Vehicles</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {salesData.map((data) => (
              <Card key={data.period} className="bg-gradient-card shadow-card">
                <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                  <CardTitle className="font-medium text-sm">{data.period}</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
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

          <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Sales Trend
                </CardTitle>
                <CardDescription>Revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center bg-muted rounded-lg h-[150px] sm:h-[200px]">
                  <p className="text-muted-foreground text-sm">Chart placeholder</p>
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

        <TabsContent value="sales" className="space-y-4 sm:space-y-6">
          <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Sales by Food Item</CardTitle>
                <CardDescription>Individual item performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Item</TableHead>
                        <TableHead className="min-w-[80px]">Qty</TableHead>
                        <TableHead className="min-w-[80px]">Revenue</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[80px]">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {salesRecords.byFoodItem.map((record) => (
                      <TableRow key={record.item}>
                        <TableCell className="font-medium text-sm">{record.item}</TableCell>
                        <TableCell className="text-sm">{record.quantity}</TableCell>
                        <TableCell className="text-success text-sm">{record.revenue}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{record.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Sales by Route</CardTitle>
                <CardDescription>Route performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Route</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[80px]">Rider</TableHead>
                        <TableHead className="min-w-[80px]">Sales</TableHead>
                        <TableHead className="min-w-[70px]">Orders</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {salesRecords.byRoute.map((record) => (
                      <TableRow key={record.route}>
                        <TableCell className="font-medium text-sm">{record.route}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{record.rider}</TableCell>
                        <TableCell className="text-success text-sm">{record.sales}</TableCell>
                        <TableCell className="text-sm">{record.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Sales by Team</CardTitle>
                <CardDescription>Team performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[80px]">Team</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[70px]">Members</TableHead>
                        <TableHead className="min-w-[90px]">Sales</TableHead>
                        <TableHead className="min-w-[80px]">Efficiency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {salesRecords.byTeam.map((record) => (
                      <TableRow key={record.team}>
                        <TableCell className="font-medium text-sm">{record.team}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{record.members}</TableCell>
                        <TableCell className="text-success text-sm">{record.totalSales}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-success text-xs">
                            {record.efficiency}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Sales by Rider & Time</CardTitle>
                <CardDescription>Individual rider performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Rider</TableHead>
                        <TableHead className="min-w-[80px]">Sales</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[60px]">Hours</TableHead>
                        <TableHead className="min-w-[80px]">Avg/Hr</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {salesRecords.byRider.map((record) => (
                      <TableRow key={record.rider}>
                        <TableCell className="font-medium text-sm">{record.rider}</TableCell>
                        <TableCell className="text-success text-sm">{record.sales}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{record.hours}h</TableCell>
                        <TableCell className="text-primary text-sm">{record.avgPerHour}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>
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

        <TabsContent value="vehicles" className="space-y-4 sm:space-y-6">
          <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Vehicle Status
                </CardTitle>
                <CardDescription>Current status of all vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[80px]">ID</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[100px]">Type</TableHead>
                        <TableHead className="min-w-[80px]">Status</TableHead>
                        <TableHead className="min-w-[80px]">Battery</TableHead>
                        <TableHead className="hidden lg:table-cell min-w-[100px]">Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {vehiclesData.vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium text-sm">{vehicle.id}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{vehicle.type}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={vehicle.status === "Active" ? "default" : vehicle.status === "Maintenance" ? "destructive" : "secondary"}
                            className={`text-xs ${
                              vehicle.status === "Active" ? "bg-success" :
                              vehicle.status === "Maintenance" ? "bg-destructive" : "bg-muted"
                            }`}
                          >
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Battery className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span className="text-sm">{vehicle.batteryLevel}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">{vehicle.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="w-5 h-5" />
                  Battery Analysis
                </CardTitle>
                <CardDescription>Battery health and charge status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">IMEI</TableHead>
                        <TableHead className="hidden sm:table-cell min-w-[70px]">Vehicle</TableHead>
                        <TableHead className="min-w-[80px]">Status</TableHead>
                        <TableHead className="min-w-[70px]">Charge</TableHead>
                        <TableHead className="hidden lg:table-cell min-w-[70px]">Health</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {vehiclesData.batteries.map((battery) => (
                      <TableRow key={battery.imei}>
                        <TableCell className="font-mono text-xs">{battery.imei}</TableCell>
                        <TableCell className="hidden sm:table-cell text-sm">{battery.vehicle}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={battery.status === "Excellent" || battery.status === "Good" ? "default" : "destructive"}
                            className={`text-xs ${
                              battery.status === "Excellent" ? "bg-success" :
                              battery.status === "Good" ? "bg-primary" : "bg-destructive"
                            }`}
                          >
                            {battery.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {parseInt(battery.charge) < 30 && <AlertTriangle className="w-3 h-3 text-destructive" />}
                            <span className="text-sm">{battery.charge}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm">{battery.health}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Battery Performance Summary</CardTitle>
              <CardDescription>Overall battery fleet status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
                <div className="text-center">
                  <p className="font-bold text-success text-xl sm:text-2xl">3</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">Healthy Batteries</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-destructive text-xl sm:text-2xl">1</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">Low Batteries</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary text-xl sm:text-2xl">81%</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">Average Charge</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-primary text-xl sm:text-2xl">90.5%</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">Average Health</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;