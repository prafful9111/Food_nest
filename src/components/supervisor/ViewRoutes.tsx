import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, Truck } from "lucide-react";

const routes = [
  {
    id: 1,
    name: "Downtown A",
    rider: "John Smith",
    status: "Active",
    currentStop: "Central Park",
    progress: 3,
    totalStops: 5,
    startTime: "09:00 AM",
    estimatedCompletion: "01:00 PM",
    stops: ["City Hall", "Central Park", "Business District", "Shopping Mall", "University Campus"]
  },
  {
    id: 2,
    name: "Suburban B", 
    rider: "Mike Davis",
    status: "Active",
    currentStop: "Community Center",
    progress: 2,
    totalStops: 5,
    startTime: "10:00 AM",
    estimatedCompletion: "02:30 PM",
    stops: ["Residential Area A", "Community Center", "Local School", "Grocery Plaza", "Medical Center"]
  },
  {
    id: 3,
    name: "Beach C",
    rider: "Sarah Johnson",
    status: "On Break",
    currentStop: "Marina",
    progress: 1,
    totalStops: 5,
    startTime: "11:00 AM",
    estimatedCompletion: "04:00 PM",
    stops: ["Marina", "Beach Boardwalk", "Pier Restaurant", "Surf Shop", "Beach Hotel"]
  }
];

const ViewRoutes = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success";
      case "On Break":
        return "bg-warning";
      case "Completed":
        return "bg-primary";
      default:
        return "";
    }
  };

  const getProgressPercentage = (progress: number, total: number) => {
    return (progress / total) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">View Routes</h1>
        <p className="text-muted-foreground">Monitor active routes and rider progress</p>
      </div>

      <div className="grid gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {route.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {route.rider}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.startTime} - {route.estimatedCompletion}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline"
                    className={getStatusColor(route.status)}
                  >
                    {route.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Track
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {route.progress}/{route.totalStops} stops
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all"
                      style={{ width: `${getProgressPercentage(route.progress, route.totalStops)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Route Stops
                  </h4>
                  <div className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          index < route.progress 
                            ? "bg-success/10 border border-success/20" 
                            : index === route.progress
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted"
                        }`}
                      >
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < route.progress
                              ? "bg-success text-white"
                              : index === route.progress
                              ? "bg-primary text-white"
                              : "bg-muted-foreground text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className={`text-sm ${
                          index === route.progress ? "font-medium" : ""
                        }`}>
                          {stop}
                          {index === route.progress && (
                            <Badge variant="outline" className="ml-2 bg-primary text-white">
                              Current
                            </Badge>
                          )}
                        </span>
                      </div>
                    ))}
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

export default ViewRoutes;