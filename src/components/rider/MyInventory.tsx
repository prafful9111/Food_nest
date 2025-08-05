import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, Plus } from "lucide-react";

const MyInventory = () => {
  const inventoryItems = [
    {
      id: 1,
      name: "Classic Burger",
      assigned: 20,
      sold: 12,
      remaining: 8,
      price: 8.99,
      status: "low",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Chicken Tacos",
      assigned: 15,
      sold: 8,
      remaining: 7,
      price: 6.50,
      status: "good",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Fish & Chips",
      assigned: 10,
      sold: 6,
      remaining: 4,
      price: 9.99,
      status: "critical",
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Caesar Salad",
      assigned: 8,
      sold: 3,
      remaining: 5,
      price: 7.99,
      status: "good",
      image: "/api/placeholder/80/80"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-destructive text-white';
      case 'low':
        return 'bg-warning text-white';
      case 'good':
        return 'bg-success text-white';
      default:
        return 'bg-muted';
    }
  };

  const getProgressValue = (sold: number, assigned: number) => {
    return (sold / assigned) * 100;
  };

  const getTotalValue = () => {
    return inventoryItems.reduce((sum, item) => sum + (item.remaining * item.price), 0);
  };

  const getTotalSalesValue = () => {
    return inventoryItems.reduce((sum, item) => sum + (item.sold * item.price), 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">My Inventory</h1>
        <p className="text-muted-foreground">Manage your cart's food inventory</p>
      </div>

      <div className="gap-6 grid md:grid-cols-3">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Remaining Value</CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-primary text-2xl">฿{getTotalValue().toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Sales Value</CardTitle>
            <Package className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-success text-2xl">฿{getTotalSalesValue().toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">
              Value of items sold
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Items Remaining</CardTitle>
            <Package className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {inventoryItems.reduce((sum, item) => sum + item.remaining, 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              Total items left
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="gap-6 grid md:grid-cols-2">
        {inventoryItems.map((item) => (
          <Card key={item.id} className="bg-gradient-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="bg-muted rounded-lg w-20 h-20 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>฿{item.price} each</CardDescription>
                    </div>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                      {item.status === 'critical' && (
                        <AlertTriangle className="ml-1 w-3 h-3" />
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="gap-4 grid grid-cols-3 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">Assigned</p>
                  <p className="font-bold">{item.assigned}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Sold</p>
                  <p className="font-bold text-success">{item.sold}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Remaining</p>
                  <p className="font-bold text-primary">{item.remaining}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sales Progress</span>
                  <span>{Math.round(getProgressValue(item.sold, item.assigned))}%</span>
                </div>
                <Progress 
                  value={getProgressValue(item.sold, item.assigned)} 
                  className="h-2"
                />
              </div>

              <div className="flex justify-between text-sm">
                <span>Remaining Value:</span>
                <span className="font-medium">฿{(item.remaining * item.price).toFixed(2)}</span>
              </div>

              {item.remaining <= 3 && (
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="mr-2 w-4 h-4" />
                  Request More
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Inventory Summary</CardTitle>
          <CardDescription>Overall inventory status and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Critical Items</h4>
              {inventoryItems.filter(item => item.status === 'critical').map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-destructive/10 p-2 rounded-lg">
                  <span className="text-sm">{item.name}</span>
                  <Badge variant="outline" className="bg-destructive text-white">
                    {item.remaining} left
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Low Stock Items</h4>
              {inventoryItems.filter(item => item.status === 'low').map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-warning/10 p-2 rounded-lg">
                  <span className="text-sm">{item.name}</span>
                  <Badge variant="outline" className="bg-warning text-white">
                    {item.remaining} left
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyInventory;