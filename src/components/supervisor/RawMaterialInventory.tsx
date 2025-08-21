import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Package, ShoppingCart, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for raw materials
const rawMaterials = [
  {
    id: 1,
    name: "Chicken Breast",
    category: "Meat",
    currentStock: 15,
    minimumStock: 50,
    maxStock: 200,
    unit: "kg",
    supplier: "Fresh Meat Co.",
    lastRestocked: "2024-01-15",
    costPerUnit: 12.50,
    status: "critical"
  },
  {
    id: 2,
    name: "Basmati Rice",
    category: "Grains",
    currentStock: 80,
    minimumStock: 100,
    maxStock: 500,
    unit: "kg",
    supplier: "Grain Masters",
    lastRestocked: "2024-01-20",
    costPerUnit: 3.20,
    status: "low"
  },
  {
    id: 3,
    name: "Tomatoes",
    category: "Vegetables",
    currentStock: 25,
    minimumStock: 30,
    maxStock: 100,
    unit: "kg",
    supplier: "Fresh Farms",
    lastRestocked: "2024-01-22",
    costPerUnit: 2.80,
    status: "low"
  },
  {
    id: 4,
    name: "Cooking Oil",
    category: "Oils",
    currentStock: 120,
    minimumStock: 50,
    maxStock: 200,
    unit: "liters",
    supplier: "Oil Express",
    lastRestocked: "2024-01-18",
    costPerUnit: 4.50,
    status: "adequate"
  },
  {
    id: 5,
    name: "Onions",
    category: "Vegetables",
    currentStock: 8,
    minimumStock: 40,
    maxStock: 150,
    unit: "kg",
    supplier: "Fresh Farms",
    lastRestocked: "2024-01-10",
    costPerUnit: 1.90,
    status: "critical"
  },
  {
    id: 6,
    name: "Salt",
    category: "Spices",
    currentStock: 95,
    minimumStock: 20,
    maxStock: 100,
    unit: "kg",
    supplier: "Spice World",
    lastRestocked: "2024-01-05",
    costPerUnit: 0.80,
    status: "adequate"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "destructive";
    case "low":
      return "secondary";
    case "adequate":
      return "default";
    default:
      return "default";
  }
};

const getStockPercentage = (current: number, max: number) => {
  return (current / max) * 100;
};

const RawMaterialInventory = () => {
  const { toast } = useToast();

  const criticalItems = rawMaterials.filter(item => item.status === "critical");
  const lowStockItems = rawMaterials.filter(item => item.status === "low");

  const handleReorderItem = (itemName: string, quantity: number) => {
    toast({
      title: "Reorder Initiated",
      description: `Reorder request for ${quantity} units of ${itemName} has been sent to procurement.`,
    });
  };

  const calculateReorderQuantity = (item: any) => {
    return item.maxStock - item.currentStock;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Raw Material Inventory</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor stock levels and manage raw material reorders
          </p>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalItems.length > 0 && (
        <Card className="border-destructive">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Critical Stock Alerts
            </CardTitle>
            <CardDescription>
              {criticalItems.length} item{criticalItems.length > 1 ? 's' : ''} require immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-destructive/5 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Only {item.currentStock} {item.unit} remaining (Min: {item.minimumStock} {item.unit})
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReorderItem(item.name, calculateReorderQuantity(item))}
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Reorder Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Items */}
      {lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-secondary" />
              Low Stock Items
            </CardTitle>
            <CardDescription>
              {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} approaching minimum stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-secondary/5 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {item.currentStock} {item.unit} remaining (Min: {item.minimumStock} {item.unit})
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleReorderItem(item.name, calculateReorderQuantity(item))}
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Complete Raw Material Inventory
          </CardTitle>
          <CardDescription>
            Overview of all raw materials and their current stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rawMaterials.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.category}</p>
                  </div>
                  <Badge variant={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Stock Level</span>
                    <span>{item.currentStock} / {item.maxStock} {item.unit}</span>
                  </div>
                  <Progress 
                    value={getStockPercentage(item.currentStock, item.maxStock)} 
                    className="h-2"
                  />
                </div>

                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Supplier</p>
                    <p className="font-medium">{item.supplier}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cost per {item.unit}</p>
                    <p className="font-medium">${item.costPerUnit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Restocked</p>
                    <p className="font-medium">{item.lastRestocked}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reorder Qty</p>
                    <p className="font-medium">{calculateReorderQuantity(item)} {item.unit}</p>
                  </div>
                </div>

                {(item.status === "critical" || item.status === "low") && (
                  <div className="mt-3 pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant={item.status === "critical" ? "destructive" : "secondary"}
                      onClick={() => handleReorderItem(item.name, calculateReorderQuantity(item))}
                      className="w-full sm:w-auto"
                    >
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      Reorder {calculateReorderQuantity(item)} {item.unit}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RawMaterialInventory;