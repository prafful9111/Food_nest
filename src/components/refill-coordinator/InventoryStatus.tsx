import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const InventoryStatus = () => {
  const inventoryData = [
    {
      item: "Poha",
      currentStock: 45,
      targetStock: 100,
      minThreshold: 20,
      riderDistribution: [
        { rider: "Mike Thompson", allocated: 8, remaining: 5 },
        { rider: "Sarah Wilson", allocated: 12, remaining: 8 },
        { rider: "David Chen", allocated: 10, remaining: 3 },
        { rider: "Lisa Rodriguez", allocated: 15, remaining: 12 }
      ],
      kitchenReady: 15,
      inPreparation: 20,
      lastUpdated: "10 mins ago",
      trend: "down"
    },
    {
      item: "Vada Pav",
      currentStock: 25,
      targetStock: 80,
      minThreshold: 15,
      riderDistribution: [
        { rider: "Mike Thompson", allocated: 15, remaining: 5 },
        { rider: "Sarah Wilson", allocated: 10, remaining: 8 },
        { rider: "David Chen", allocated: 8, remaining: 2 },
        { rider: "Lisa Rodriguez", allocated: 12, remaining: 10 }
      ],
      kitchenReady: 8,
      inPreparation: 25,
      lastUpdated: "5 mins ago",
      trend: "down"
    },
    {
      item: "Chai",
      currentStock: 120,
      targetStock: 150,
      minThreshold: 30,
      riderDistribution: [
        { rider: "Mike Thompson", allocated: 25, remaining: 20 },
        { rider: "Sarah Wilson", allocated: 20, remaining: 8 },
        { rider: "David Chen", allocated: 22, remaining: 18 },
        { rider: "Lisa Rodriguez", allocated: 28, remaining: 25 }
      ],
      kitchenReady: 35,
      inPreparation: 15,
      lastUpdated: "2 mins ago",
      trend: "up"
    },
    {
      item: "Water Bottle",
      currentStock: 200,
      targetStock: 200,
      minThreshold: 50,
      riderDistribution: [
        { rider: "Mike Thompson", allocated: 40, remaining: 35 },
        { rider: "Sarah Wilson", allocated: 35, remaining: 15 },
        { rider: "David Chen", allocated: 30, remaining: 25 },
        { rider: "Lisa Rodriguez", allocated: 45, remaining: 40 }
      ],
      kitchenReady: 85,
      inPreparation: 0,
      lastUpdated: "1 min ago",
      trend: "stable"
    }
  ];

  const getStockStatus = (current: number, target: number, min: number) => {
    if (current <= min) return { status: 'critical', color: 'bg-destructive text-destructive-foreground' };
    if (current <= target * 0.5) return { status: 'low', color: 'bg-warning text-warning-foreground' };
    if (current >= target * 0.8) return { status: 'good', color: 'bg-success text-success-foreground' };
    return { status: 'medium', color: 'bg-primary text-primary-foreground' };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Inventory Status</h1>
        <p className="text-muted-foreground">Real-time inventory levels and distribution</p>
      </div>

      <div className="gap-6 grid">
        {inventoryData.map((item) => {
          const stockInfo = getStockStatus(item.currentStock, item.targetStock, item.minThreshold);
          const percentage = (item.currentStock / item.targetStock) * 100;
          
          return (
            <Card key={item.item} className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6" />
                    <div>
                      <CardTitle className="text-xl">{item.item}</CardTitle>
                      <CardDescription>
                        Last updated {item.lastUpdated}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(item.trend)}
                    <Badge variant="outline" className={stockInfo.color}>
                      {stockInfo.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stock Overview */}
                <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-bold text-2xl">{item.currentStock}</div>
                    <div className="text-muted-foreground text-sm">Current Stock</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-bold text-success text-2xl">{item.kitchenReady}</div>
                    <div className="text-muted-foreground text-sm">Kitchen Ready</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-bold text-primary text-2xl">{item.inPreparation}</div>
                    <div className="text-muted-foreground text-sm">In Preparation</div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-center">
                    <div className="font-bold text-2xl">{item.targetStock}</div>
                    <div className="text-muted-foreground text-sm">Target Stock</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Stock Level</span>
                    <span>{percentage.toFixed(1)}% of target</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Min: {item.minThreshold}</span>
                    <span>Target: {item.targetStock}</span>
                  </div>
                </div>

                {/* Rider Distribution */}
                <div>
                  <h4 className="flex items-center gap-2 mb-3 font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    Rider Distribution
                  </h4>
                  <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                    {item.riderDistribution.map((distribution) => (
                      <div key={distribution.rider} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{distribution.rider}</div>
                          <div className="text-muted-foreground text-xs">
                            Allocated: {distribution.allocated}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${distribution.remaining <= 5 ? 'text-destructive' : 'text-success'}`}>
                            {distribution.remaining}
                          </div>
                          <div className="text-muted-foreground text-xs">remaining</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {item.currentStock <= item.minThreshold && (
                    <Button variant="destructive" size="sm">
                      <AlertTriangle className="mr-1 w-4 h-4" />
                      Request Emergency Restock
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Stock
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryStatus;