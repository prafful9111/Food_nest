import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Navigation, Clock, MapPin, Battery, Fuel } from "lucide-react";

const RequestsManagement = () => {
  const alerts = {
    refillRequests: [
      { id: 1, rider: "John Smith", route: "Downtown A", item: "Classic Burger", quantity: 5, urgent: true, time: "10 min ago" },
      { id: 2, rider: "Mike Davis", route: "Suburban B", item: "Chicken Tacos", quantity: 8, urgent: false, time: "25 min ago" },
    ],
    sosRequests: [
      { id: 1, rider: "Sarah Johnson", route: "Beach C", reason: "Vehicle breakdown", location: "Beach Rd & 5th St", time: "5 min ago" },
      { id: 2, rider: "Tom Wilson", route: "University D", reason: "Medical emergency", location: "University Campus", time: "2 min ago" },
    ],
    idleRiders: [
      { id: 1, rider: "Alex Chen", route: "Park E", location: "Central Park", duration: "15 min", lastSale: "45 min ago" },
      { id: 2, rider: "Lisa Wang", route: "Mall F", location: "Shopping Center", duration: "12 min", lastSale: "32 min ago" },
    ],
    offRouteRiders: [
      { id: 1, rider: "Mark Brown", route: "Residential G", currentLocation: "Industrial Area", deviation: "2.3 km", time: "8 min ago" },
      { id: 2, rider: "Emma Davis", route: "Office H", currentLocation: "Residential Zone", deviation: "1.8 km", time: "15 min ago" },
    ],
    missedCheckpoints: [
      { id: 1, rider: "Chris Lee", route: "Harbor I", checkpoint: "Pier 7", scheduledTime: "2:30 PM", missedBy: "25 min" },
      { id: 2, rider: "Anna Kim", route: "School J", checkpoint: "Elementary School", scheduledTime: "1:45 PM", missedBy: "40 min" },
    ]
  };

  const getUrgencyColor = (urgent: boolean) => urgent ? "bg-destructive" : "bg-warning";
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch(priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-secondary";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Requests Management</h1>
        <p className="text-muted-foreground">Monitor and respond to rider alerts and requests</p>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        {/* Refill Requests */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="w-5 h-5" />
              Refill Requests
            </CardTitle>
            <CardDescription>Riders requesting inventory refills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.refillRequests.map((request) => (
              <div key={request.id} className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{request.rider}</h4>
                    <Badge variant="outline">{request.route}</Badge>
                  </div>
                  <Badge className={getUrgencyColor(request.urgent)}>
                    {request.urgent ? "Urgent" : "Normal"}
                  </Badge>
                </div>
                <p className="mb-2 text-muted-foreground text-sm">
                  Needs {request.quantity} {request.item} • {request.time}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-success">Approve</Button>
                  <Button size="sm" variant="outline">Contact Rider</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SOS Requests */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              SOS Requests
            </CardTitle>
            <CardDescription>Emergency assistance requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.sosRequests.map((sos) => (
              <div key={sos.id} className="bg-destructive/10 p-3 border border-destructive/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{sos.rider}</h4>
                    <Badge variant="outline">{sos.route}</Badge>
                  </div>
                  <Badge className="bg-destructive">Emergency</Badge>
                </div>
                <p className="mb-1 text-sm">
                  <strong>Reason:</strong> {sos.reason}
                </p>
                <p className="mb-2 text-muted-foreground text-sm">
                  <MapPin className="inline mr-1 w-3 h-3" />
                  {sos.location} • {sos.time}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-destructive">Respond Now</Button>
                  <Button size="sm" variant="outline">Call Rider</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="gap-6 grid lg:grid-cols-3">
        {/* Idle Riders */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Idle Riders (10+ min)
            </CardTitle>
            <CardDescription>Riders without sales activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.idleRiders.map((rider) => (
              <div key={rider.id} className="bg-warning/10 p-3 border border-warning/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{rider.rider}</h4>
                  <Badge className="bg-warning">{rider.duration}</Badge>
                </div>
                <p className="mb-2 text-muted-foreground text-xs">
                  {rider.location} • Last sale: {rider.lastSale}
                </p>
                <Button size="sm" variant="outline" className="w-full">Contact</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Off Route Riders */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Off Route Riders
            </CardTitle>
            <CardDescription>Riders deviating from assigned routes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.offRouteRiders.map((rider) => (
              <div key={rider.id} className="bg-warning/10 p-3 border border-warning/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{rider.rider}</h4>
                  <Badge className="bg-warning">{rider.deviation}</Badge>
                </div>
                <p className="mb-2 text-muted-foreground text-xs">
                  Expected: {rider.route} • Current: {rider.currentLocation}
                </p>
                <Button size="sm" variant="outline" className="w-full">Guide Back</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Missed Checkpoints */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Missed Checkpoints
            </CardTitle>
            <CardDescription>Riders who missed scheduled stops</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.missedCheckpoints.map((checkpoint) => (
              <div key={checkpoint.id} className="bg-destructive/10 p-3 border border-destructive/20 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{checkpoint.rider}</h4>
                  <Badge className="bg-destructive">{checkpoint.missedBy}</Badge>
                </div>
                <p className="mb-2 text-muted-foreground text-xs">
                  {checkpoint.checkpoint} • Due: {checkpoint.scheduledTime}
                </p>
                <Button size="sm" variant="outline" className="w-full">Reschedule</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Alert Summary</CardTitle>
          <CardDescription>Current status overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid md:grid-cols-5">
            <div className="text-center">
              <p className="font-bold text-warning text-2xl">{alerts.refillRequests.length}</p>
              <p className="text-muted-foreground text-sm">Refill Requests</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-destructive text-2xl">{alerts.sosRequests.length}</p>
              <p className="text-muted-foreground text-sm">SOS Alerts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-warning text-2xl">{alerts.idleRiders.length}</p>
              <p className="text-muted-foreground text-sm">Idle Riders</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-warning text-2xl">{alerts.offRouteRiders.length}</p>
              <p className="text-muted-foreground text-sm">Off Route</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-destructive text-2xl">{alerts.missedCheckpoints.length}</p>
              <p className="text-muted-foreground text-sm">Missed Stops</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsManagement;