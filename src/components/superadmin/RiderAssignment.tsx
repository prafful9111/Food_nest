import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserCheck, Car, MapPin, UtensilsCrossed, X } from "lucide-react";

const riders = [
  { id: 1, name: "Mike Rodriguez", status: "Available" },
  { id: 2, name: "Sarah Chen", status: "Available" },
  { id: 3, name: "James Wilson", status: "On Route" },
  { id: 4, name: "Emily Davis", status: "Available" },
];

const vehicles = [
  { id: 1, registration: "FC-001", type: "Cart", status: "Available" },
  { id: 2, registration: "FC-002", type: "Cart", status: "Available" },
  { id: 3, registration: "FC-003", type: "Cart", status: "In Use" },
  { id: 4, registration: "FC-004", type: "Bike", status: "Available" },
];

const routes = [
  { id: 1, name: "Downtown Route A", stops: 5 },
  { id: 2, name: "Suburban Route B", stops: 4 },
  { id: 3, name: "Beach Route C", stops: 6 },
];

const foodItems = [
  { id: 1, name: "Poha", available: 50 },
  { id: 2, name: "Vada Pav", available: 30 },
  { id: 3, name: "Chai", available: 100 },
  { id: 4, name: "Water Bottle", available: 75 },
];

const assignments = [
  {
    id: 1,
    rider: "James Wilson",
    vehicle: "FC-003",
    route: "Downtown Route A",
    foodItems: [
      { name: "Poha", quantity: 20 },
      { name: "Chai", quantity: 30 }
    ],
    assignedDate: "2024-01-15",
    status: "Active"
  }
];

const RiderAssignment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedFoodItems, setSelectedFoodItems] = useState<{name: string, quantity: number}[]>([]);
  const [currentFoodItem, setCurrentFoodItem] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");

  const addFoodItem = () => {
    if (currentFoodItem && currentQuantity && !selectedFoodItems.find(item => item.name === currentFoodItem)) {
      setSelectedFoodItems([...selectedFoodItems, { name: currentFoodItem, quantity: parseInt(currentQuantity) }]);
      setCurrentFoodItem("");
      setCurrentQuantity("");
    }
  };

  const removeFoodItem = (itemName: string) => {
    setSelectedFoodItems(selectedFoodItems.filter(item => item.name !== itemName));
  };

  const handleAssignment = () => {
    // Assignment logic here
    setIsOpen(false);
    setSelectedRider("");
    setSelectedVehicle("");
    setSelectedRoute("");
    setSelectedFoodItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Rider Assignment</h1>
          <p className="text-muted-foreground">Assign riders to vehicles, routes, and food inventory</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Rider Assignment</DialogTitle>
              <DialogDescription>
                Assign a rider to a vehicle, route, and food inventory
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Rider</Label>
                  <Select value={selectedRider} onValueChange={setSelectedRider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose rider" />
                    </SelectTrigger>
                    <SelectContent>
                      {riders.filter(r => r.status === "Available").map((rider) => (
                        <SelectItem key={rider.id} value={rider.name}>
                          {rider.name} - {rider.status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Vehicle</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.filter(v => v.status === "Available").map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.registration}>
                          {vehicle.registration} - {vehicle.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Route</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.id} value={route.name}>
                        {route.name} - {route.stops} stops
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Assign Food Items</Label>
                <div className="flex gap-2">
                  <Select value={currentFoodItem} onValueChange={setCurrentFoodItem}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select food item" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodItems
                        .filter(item => !selectedFoodItems.find(selected => selected.name === item.name))
                        .map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name} (Available: {item.available})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={currentQuantity}
                    onChange={(e) => setCurrentQuantity(e.target.value)}
                    className="w-20"
                  />
                  <Button onClick={addFoodItem} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {selectedFoodItems.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Items</Label>
                    <div className="grid gap-2">
                      {selectedFoodItems.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-2 border rounded">
                          <span>{item.name} - Qty: {item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFoodItem(item.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedRider && selectedVehicle && selectedRoute && selectedFoodItems.length > 0 && (
                <div className="border-t pt-4">
                  <Label>Assignment Summary</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      <span>Rider: {selectedRider}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>Vehicle: {selectedVehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Route: {selectedRoute}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4" />
                      <span>Items: {selectedFoodItems.length} food items</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  onClick={handleAssignment}
                  disabled={!selectedRider || !selectedVehicle || !selectedRoute || selectedFoodItems.length === 0}
                >
                  Create Assignment
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>Active rider assignments and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className="bg-success">{assignment.status}</Badge>
                    <span className="font-medium">{assignment.rider}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Assigned: {assignment.assignedDate}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Vehicle:</span> {assignment.vehicle}
                  </div>
                  <div>
                    <span className="font-medium">Route:</span> {assignment.route}
                  </div>
                  <div>
                    <span className="font-medium">Items:</span> {assignment.foodItems.length} items
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {assignment.foodItems.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item.name}: {item.quantity}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderAssignment;