import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, Calendar, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const vehicles = [
  {
    id: 1,
    registrationNo: "MH12AB1234",
    status: "Available",
    lastServiceDate: "2024-01-15",
    condition: "Excellent",
    isAssigned: false,
    fuelLevel: 85
  },
  {
    id: 2,
    registrationNo: "MH12CD5678",
    status: "In Use",
    lastServiceDate: "2024-01-10",
    condition: "Good",
    isAssigned: true,
    assignedTo: "John Smith",
    fuelLevel: 45
  },
  {
    id: 3,
    registrationNo: "MH12EF9012",
    status: "Available",
    lastServiceDate: "2023-12-20",
    condition: "Fair",
    isAssigned: false,
    fuelLevel: 90
  },
  {
    id: 4,
    registrationNo: "MH12GH3456",
    status: "Issue",
    lastServiceDate: "2024-01-05",
    condition: "Maintenance Required",
    isAssigned: false,
    fuelLevel: 0
  },
];

const AvailableVehicles = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'In Use':
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      case 'Issue':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-success';
      case 'In Use':
        return 'bg-primary';
      case 'Issue':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent':
        return 'bg-success';
      case 'Good':
        return 'bg-primary';
      case 'Fair':
        return 'bg-warning';
      default:
        return 'bg-destructive';
    }
  };

  const getFuelColor = (level: number) => {
    if (level > 70) return 'bg-success';
    if (level > 30) return 'bg-warning';
    return 'bg-destructive';
  };

  const handleRequestVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsRequestOpen(true);
  };

  const handleSubmitRequest = () => {
    // Submit vehicle request logic here
    setIsRequestOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Available Vehicles</h1>
          <p className="text-muted-foreground">Browse and request vehicles for your route</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:bg-primary-hover"
          onClick={() => setIsRequestOpen(true)}
        >
          <Truck className="h-4 w-4 mr-2" />
          Request Any Vehicle
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-gradient-card shadow-card hover:shadow-warm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {vehicle.registrationNo}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {getStatusIcon(vehicle.status)}
                  <Badge 
                    variant="outline"
                    className={getStatusColor(vehicle.status)}
                  >
                    {vehicle.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Condition</span>
                  <Badge 
                    variant="outline"
                    className={getConditionColor(vehicle.condition)}
                  >
                    {vehicle.condition}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Last Service
                  </span>
                  <span>{vehicle.lastServiceDate}</span>
                </div>

                {vehicle.status !== "Issue" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Fuel Level</span>
                      <span>{vehicle.fuelLevel}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getFuelColor(vehicle.fuelLevel)}`}
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {vehicle.isAssigned && (
                  <div className="p-2 bg-muted rounded-lg text-sm">
                    <span className="text-muted-foreground">Assigned to: </span>
                    <span className="font-medium">{vehicle.assignedTo}</span>
                  </div>
                )}
              </div>

              <Button 
                className="w-full"
                variant={vehicle.status === "Available" ? "default" : "outline"}
                disabled={vehicle.status !== "Available"}
                onClick={() => handleRequestVehicle(vehicle)}
              >
                {vehicle.status === "Available" ? "Request Vehicle" : 
                 vehicle.status === "In Use" ? "Not Available" : "Under Maintenance"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Vehicle</DialogTitle>
            <DialogDescription>
              {selectedVehicle 
                ? `Submit a request for vehicle ${selectedVehicle.registrationNo}`
                : "Submit a general vehicle request to your supervisor"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedVehicle && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h4 className="font-medium">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Registration:</span>
                    <p className="font-medium">{selectedVehicle.registrationNo}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <p className="font-medium">{selectedVehicle.condition}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel Level:</span>
                    <p className="font-medium">{selectedVehicle.fuelLevel}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Service:</span>
                    <p className="font-medium">{selectedVehicle.lastServiceDate}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmitRequest}>
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setIsRequestOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailableVehicles;