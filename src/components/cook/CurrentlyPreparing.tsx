import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChefHat, Clock } from "lucide-react";

const preparingItems = [
  { 
    id: 1, 
    name: "Poha", 
    quantity: 20, 
    progress: 75, 
    timeRemaining: "5 min", 
    startTime: "10:30 AM",
    priority: "High"
  },
  { 
    id: 2, 
    name: "Water Bottle", 
    quantity: 15, 
    progress: 30, 
    timeRemaining: "2 min", 
    startTime: "10:45 AM",
    priority: "Medium"
  },
];

const CurrentlyPreparing = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive';
      case 'Medium':
        return 'bg-warning';
      case 'Low':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Currently Preparing
        </CardTitle>
        <CardDescription>Food items being worked on right now</CardDescription>
      </CardHeader>
      <CardContent>
        {preparingItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <ChefHat className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No items currently being prepared</p>
          </div>
        ) : (
          <div className="space-y-4">
            {preparingItems.map((item) => (
              <div key={item.id} className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} • Started: {item.startTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={getPriorityColor(item.priority)}
                    >
                      {item.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {item.timeRemaining}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentlyPreparing;