import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package, AlertTriangle, CheckCircle, Users } from "lucide-react";
import SOSButton from "../rider/SOSButton";

const RefillCoordinatorOverview = () => {
  const stats = {
    pendingRequests: 12,
    completedToday: 8,
    lowStockItems: 3,
    activeCooks: 4
  };

  const urgentRequests = [
    { rider: "Mike Thompson", item: "Vada Pav", quantity: 15, location: "Route A", time: "10 mins ago", priority: "high" },
    { rider: "Sarah Wilson", item: "Chai", quantity: 20, location: "Route B", time: "15 mins ago", priority: "medium" },
    { rider: "David Chen", item: "Poha", quantity: 8, location: "Route C", time: "20 mins ago", priority: "high" },
  ];

  const inventoryStatus = [
    { item: "Poha", current: 45, target: 100, status: "low" },
    { item: "Vada Pav", current: 25, target: 80, status: "critical" },
    { item: "Chai", current: 120, target: 150, status: "good" },
    { item: "Water Bottle", current: 200, target: 200, status: "good" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'good': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Refill Coordinator Dashboard</h1>
        <p className="text-muted-foreground">Manage refill requests and coordinate with kitchen</p>
      </div>
    <SOSButton />
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Pending Requests</CardTitle>
            <Clock className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-warning text-2xl">{stats.pendingRequests}</div>
            <p className="text-muted-foreground text-xs">
              Awaiting fulfillment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed Today</CardTitle>
            <CheckCircle className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-success text-2xl">{stats.completedToday}</div>
            <p className="text-muted-foreground text-xs">
              Requests fulfilled
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Low Stock Items</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-destructive text-2xl">{stats.lowStockItems}</div>
            <p className="text-muted-foreground text-xs">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Cooks</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.activeCooks}</div>
            <p className="text-muted-foreground text-xs">
              On duty now
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Urgent Refill Requests</CardTitle>
            <CardDescription>High priority requests requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentRequests.map((request, index) => (
                <div key={index} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{request.rider}</p>
                      <Badge 
                        variant="outline"
                        className={getPriorityColor(request.priority)}
                      >
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {request.quantity}x {request.item} • {request.location}
                    </p>
                    <p className="text-muted-foreground text-xs">{request.time}</p>
                  </div>
                  <Button size="sm" variant="default">
                    Fulfill
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryStatus.map((item) => (
                <div key={item.item} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <p className="text-muted-foreground text-sm">
                        {item.current}/{item.target} units
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="bg-muted rounded-full w-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.status === 'critical' ? 'bg-destructive' :
                        item.status === 'low' ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${(item.current / item.target) * 100}%` }}
                    />
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

export default RefillCoordinatorOverview;