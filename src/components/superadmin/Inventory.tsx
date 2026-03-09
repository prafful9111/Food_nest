import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Package, AlertTriangle, Plus, RefreshCw, ChefHat, MapPin, Loader2 } from "lucide-react";
import { useGetInventoryItemsQuery } from "@/store/api/inventoryApi";

// Temporary Mocks for what the API does not handle natively yet:
const rawMaterialRequests = [
  { id: 1, item: "Burger Patties", quantity: 20, cook: "Chef Maria", reason: "High demand in downtown area", time: "2 hours ago", status: "Pending" },
  { id: 2, item: "Lettuce", quantity: 15, cook: "Chef David", reason: "Running low on salads", time: "3 hours ago", status: "Pending" },
];

const cookStatus = [
  { id: 1, item: "Poha", status: "Ready", quantity: 25, cook: "Chef Maria" },
  { id: 2, item: "Vada Pav", status: "Processing", quantity: 15, cook: "Chef David" },
];

const liveRiderLocations = [
  { id: 1, rider: "John Smith", location: "Near Stop 3 - Central Park", route: "Downtown Route A", lastUpdate: "2 min ago", status: "Active" },
  { id: 2, rider: "Mike Davis", location: "Stop 1 - Residential Area A", route: "Suburban Route B", lastUpdate: "5 min ago", status: "Active" },
];

const Inventory = () => {
  const { data: inventoryItems, isLoading, error, refetch } = useGetInventoryItemsQuery();

  const getStatusColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio <= 0.2) return 'bg-destructive';
    if (ratio <= 0.5) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusText = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio <= 0.2) return 'Critical';
    if (ratio <= 0.5) return 'Low';
    return 'Good';
  };

  const getProgressValue = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const handleRequestAction = (requestId: number, action: 'approve' | 'reject', remarks?: string) => {
    console.log(`${action} request ${requestId}`, remarks);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Monitor stock levels and material requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Stock Levels
              </CardTitle>
              <CardDescription>Current inventory status retrieved live</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : error ? (
                <div className="text-destructive text-center py-4">Failed to load inventory.</div>
              ) : (
                <div className="space-y-4">
                  {inventoryItems?.length === 0 && <p className="text-muted-foreground text-center">No items found.</p>}
                  {inventoryItems?.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge 
                            variant="outline"
                            className={getStatusColor(item.current, item.max_capacity)}
                          >
                            {getStatusText(item.current, item.max_capacity)}
                          </Badge>
                          {item.is_raw_material && (
                            <Badge variant="outline" className="bg-secondary">Raw Material</Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.current}/{item.max_capacity} {item.unit}
                        </span>
                      </div>
                      <Progress 
                        value={getProgressValue(item.current, item.max_capacity)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Cook Status
              </CardTitle>
              <CardDescription>Current food preparation status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {cookStatus.map((item) => (
                  <div key={item.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.item}</h4>
                      <Badge 
                        variant="outline"
                        className={item.status === "Ready" ? "bg-success" : "bg-warning"}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.cook}</span>
                      <span>{item.quantity} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Live Rider Locations
              </CardTitle>
              <CardDescription>Current rider positions and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveRiderLocations.map((rider) => (
                  <div key={rider.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{rider.rider}</h4>
                      <Badge 
                        variant="outline"
                        className={rider.status === "Active" ? "bg-success" : "bg-accent"}
                      >
                        {rider.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{rider.location}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{rider.route}</span>
                      <span>Updated {rider.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Raw Material Requests
              </CardTitle>
              <CardDescription>Pending requests from cooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rawMaterialRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{request.item}</h4>
                      <Badge 
                        variant="outline"
                        className={request.status === "Approved" ? "bg-success" : request.status === "Rejected" ? "bg-destructive" : "bg-warning"}
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{request.quantity} units</span>
                      <span className="text-xs text-muted-foreground">{request.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{request.reason}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{request.cook}</span>
                    </div>
                    {request.status === "Pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Inventory;