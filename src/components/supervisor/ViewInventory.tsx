import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, Truck } from "lucide-react";

const riderInventories = [
  {
    rider: "John Smith",
    route: "Downtown A", 
    items: [
      { name: "Classic Burger", assigned: 20, sold: 12, remaining: 8 },
      { name: "Chicken Tacos", assigned: 15, sold: 8, remaining: 7 },
      { name: "Fish & Chips", assigned: 10, sold: 6, remaining: 4 },
      { name: "Caesar Salad", assigned: 8, sold: 3, remaining: 5 },
    ]
  },
  {
    rider: "Mike Davis",
    route: "Suburban B",
    items: [
      { name: "Classic Burger", assigned: 18, sold: 15, remaining: 3 },
      { name: "Chicken Tacos", assigned: 12, sold: 9, remaining: 3 },
      { name: "Fish & Chips", assigned: 8, sold: 8, remaining: 0 },
      { name: "Caesar Salad", assigned: 6, sold: 2, remaining: 4 },
    ]
  },
  {
    rider: "Sarah Johnson",
    route: "Beach C",
    items: [
      { name: "Classic Burger", assigned: 15, sold: 5, remaining: 10 },
      { name: "Chicken Tacos", assigned: 20, sold: 12, remaining: 8 },
      { name: "Fish & Chips", assigned: 12, sold: 4, remaining: 8 },
      { name: "Caesar Salad", assigned: 10, sold: 6, remaining: 4 },
    ]
  }
];

const ViewInventory = () => {
  const getStatusColor = (remaining: number, assigned: number) => {
    const percentage = (remaining / assigned) * 100;
    if (percentage <= 20) return "text-destructive";
    if (percentage <= 50) return "text-warning";
    return "text-success";
  };

  const getProgressValue = (sold: number, assigned: number) => {
    return (sold / assigned) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">View Inventory</h1>
        <p className="text-muted-foreground">Monitor rider inventory levels and sales progress</p>
      </div>

      <div className="grid gap-6">
        {riderInventories.map((inventory) => (
          <Card key={inventory.rider} className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                {inventory.rider}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {inventory.route}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.items.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.remaining === 0 && (
                          <Badge variant="outline" className="bg-destructive text-white">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Out of Stock
                          </Badge>
                        )}
                        {item.remaining <= item.assigned * 0.2 && item.remaining > 0 && (
                          <Badge variant="outline" className="bg-warning text-white">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          <span className={getStatusColor(item.remaining, item.assigned)}>
                            {item.remaining}
                          </span> / {item.assigned} remaining
                        </p>
                        <p className="text-xs text-muted-foreground">{item.sold} sold</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Sales Progress</span>
                        <span>{Math.round(getProgressValue(item.sold, item.assigned))}%</span>
                      </div>
                      <Progress 
                        value={getProgressValue(item.sold, item.assigned)} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Assigned</p>
                      <p className="text-lg font-bold">
                        {inventory.items.reduce((sum, item) => sum + item.assigned, 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sold</p>
                      <p className="text-lg font-bold text-success">
                        {inventory.items.reduce((sum, item) => sum + item.sold, 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                      <p className="text-lg font-bold text-primary">
                        {inventory.items.reduce((sum, item) => sum + item.remaining, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewInventory;