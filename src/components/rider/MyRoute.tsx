import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CheckCircle, Circle } from "lucide-react";

const MyRoute = () => {
  const routeInfo = {
    name: "Downtown A",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    currentStop: 3,
    totalStops: 5,
    status: "Active"
  };

  const stops = [
    { 
      id: 1, 
      name: "City Hall", 
      address: "123 Main St", 
      status: "completed", 
      arrivalTime: "09:15 AM",
      salesMade: 8,
      revenue: "฿67.50"
    },
    { 
      id: 2, 
      name: "Central Park", 
      address: "456 Park Ave", 
      status: "completed", 
      arrivalTime: "10:30 AM",
      salesMade: 12,
      revenue: "฿98.25"
    },
    { 
      id: 3, 
      name: "Business District", 
      address: "789 Commerce Blvd", 
      status: "current", 
      arrivalTime: "11:45 AM",
      salesMade: 6,
      revenue: "฿45.75"
    },
    { 
      id: 4, 
      name: "Shopping Mall", 
      address: "321 Retail Way", 
      status: "upcoming", 
      estimatedTime: "12:30 PM",
      salesMade: 0,
      revenue: "฿0.00"
    },
    { 
      id: 5, 
      name: "University Campus", 
      address: "654 Education Dr", 
      status: "upcoming", 
      estimatedTime: "01:15 PM",
      salesMade: 0,
      revenue: "฿0.00"
    }
  ];

  const getStopIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'current':
        return <Circle className="fill-current w-5 h-5 text-primary" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStopBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success">Completed</Badge>;
      case 'current':
        return <Badge className="bg-primary">Current</Badge>;
      default:
        return <Badge variant="secondary">Upcoming</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">My Route</h1>
        <p className="text-muted-foreground">Your assigned route and current progress</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21999.02059654968!2d100.87225981231515!3d12.913238405114274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310295924d31d7e3%3A0xa97ff301a9bd10ff!2sPattaya%20City%2C%20Bang%20Lamung%20District%2C%20Chon%20Buri%2020150%2C%20Thailand!5e0!3m2!1sen!2sin!4v1754486212478!5m2!1sen!2sin" width="1900" height="450"></iframe>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5" />
                {routeInfo.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {routeInfo.startTime} - {routeInfo.endTime}
                </span>
                <span>
                  Stop {routeInfo.currentStop} of {routeInfo.totalStops}
                </span>
              </CardDescription>
            </div>
            <Badge className="bg-success">{routeInfo.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Route Progress</span>
                <span className="text-muted-foreground text-sm">
                  {routeInfo.currentStop}/{routeInfo.totalStops} stops
                </span>
              </div>
              <div className="bg-muted rounded-full w-full h-2">
                <div 
                  className="bg-gradient-primary rounded-full h-2 transition-all"
                  style={{ width: `${(routeInfo.currentStop / routeInfo.totalStops) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Route Stops</h2>
        {stops.map((stop) => (
          <Card key={stop.id} className={`bg-gradient-card shadow-card ${
            stop.status === 'current' ? 'ring-2 ring-primary' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  {getStopIcon(stop.status)}
                  <div>
                    <CardTitle className="text-lg">{stop.name}</CardTitle>
                    <CardDescription>{stop.address}</CardDescription>
                  </div>
                </div>
                {getStopBadge(stop.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-muted-foreground text-sm">Time</p>
                  <p className="font-medium">
                    {stop.status === 'upcoming' ? stop.estimatedTime : stop.arrivalTime}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Sales Made</p>
                  <p className="font-medium">{stop.salesMade} items</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Revenue</p>
                  <p className="font-medium text-success">{stop.revenue}</p>
                </div>
                <div className="flex items-end">
                  {stop.status === 'current' && (
                    <Button size="sm" className="w-full">
                      Mark Complete
                    </Button>
                  )}
                  {stop.status === 'upcoming' && (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Not Started
                    </Button>
                  )}
                  {stop.status === 'completed' && (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Route Summary</CardTitle>
          <CardDescription>Today's performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <p className="text-muted-foreground text-sm">Stops Completed</p>
              <p className="font-bold text-2xl">
                {stops.filter(stop => stop.status === 'completed').length}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Sales</p>
              <p className="font-bold text-2xl">
                {stops.reduce((sum, stop) => sum + stop.salesMade, 0)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="font-bold text-success text-2xl">
                ${stops.reduce((sum, stop) => sum + parseFloat(stop.revenue.replace('$', '')), 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Avg per Stop</p>
              <p className="font-bold text-2xl">
                ${(stops.reduce((sum, stop) => sum + parseFloat(stop.revenue.replace('$', '')), 0) / stops.filter(stop => stop.status === 'completed').length).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyRoute;