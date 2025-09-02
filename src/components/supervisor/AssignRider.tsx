import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Truck, User, Package } from "lucide-react";

const riders = [
  { id: 1, name: "John Smith", status: "Available", route: "None" },
  { id: 2, name: "Mike Davis", status: "Active", route: "Downtown A" },
  { id: 3, name: "Sarah Johnson", status: "Available", route: "None" },
  { id: 4, name: "Tom Wilson", status: "Off Duty", route: "None" },
];

const routes = [
  { id: 1, name: "Downtown A", status: "Available" },
  { id: 2, name: "Suburban B", status: "Assigned" },
  { id: 3, name: "Beach C", status: "Available" },
  { id: 4, name: "University D", status: "Available" },
];

const vehicles = [
  { id: 1, registration: "FC001", type: "Electric Cart", status: "Available", battery: "85%" },
  { id: 2, registration: "FC002", type: "Electric Cart", status: "Maintenance", battery: "20%" },
  { id: 3, registration: "EB001", type: "Electric Bike", status: "Available", battery: "92%" },
  { id: 4, registration: "FC003", type: "Electric Cart", status: "In Use", battery: "67%" },
];

const batteries = [
  { id: 1, imei: "356938035643809", vehicle: "FC001", status: "Good", charge: "85%" },
  { id: 2, imei: "356938035643810", vehicle: "FC002", status: "Low", charge: "20%" },
  { id: 3, imei: "356938035643811", vehicle: "EB001", status: "Excellent", charge: "92%" },
  { id: 4, imei: "356938035643812", vehicle: "FC003", status: "Good", charge: "67%" },
];

const foodItems = [
  { name: "Classic Burger", available: 50 },
  { name: "Chicken Tacos", available: 30 },
  { name: "Fish & Chips", available: 25 },
  { name: "Caesar Salad", available: 20 },
];

const AssignRider = () => {
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedBattery, setSelectedBattery] = useState("");
  const [foodQuantities, setFoodQuantities] = useState<{[key: string]: number}>({});

  const handleQuantityChange = (foodName: string, quantity: number) => {
    setFoodQuantities(prev => ({
      ...prev,
      [foodName]: quantity
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Assign Rider</h1>
        <p className="text-muted-foreground">Assign riders to routes and allocate food inventory</p>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Rider Assignment
            </CardTitle>
            <CardDescription>Select rider and route</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rider">Select Rider</Label>
              <Select value={selectedRider} onValueChange={setSelectedRider}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a rider" />
                </SelectTrigger>
                <SelectContent>
                  {riders.map((rider) => (
                    <SelectItem key={rider.id} value={rider.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>{rider.name}</span>
                        <Badge 
                          variant={rider.status === "Available" ? "default" : "secondary"}
                          className={rider.status === "Available" ? "bg-success ml-2" : "ml-2"}
                        >
                          {rider.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Select Route</Label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>{route.name}</span>
                        <Badge 
                          variant={route.status === "Available" ? "default" : "secondary"}
                          className={route.status === "Available" ? "bg-success ml-2" : "ml-2"}
                        >
                          {route.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle">Select Vehicle</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>{vehicle.registration} - {vehicle.type}</span>
                        <Badge 
                          variant={vehicle.status === "Available" ? "default" : "secondary"}
                          className={vehicle.status === "Available" ? "bg-success ml-2" : "ml-2"}
                        >
                          {vehicle.battery}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="battery">Select Battery</Label>
              <Select value={selectedBattery} onValueChange={setSelectedBattery}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a battery" />
                </SelectTrigger>
                <SelectContent>
                  {batteries.map((battery) => (
                    <SelectItem key={battery.id} value={battery.id.toString()}>
                      <div className="flex justify-between items-center w-full">
                        <span>IMEI: {battery.imei}</span>
                        <Badge 
                          variant={battery.status === "Excellent" || battery.status === "Good" ? "default" : "destructive"}
                          className={battery.status === "Excellent" || battery.status === "Good" ? "bg-success ml-2" : "bg-destructive ml-2"}
                        >
                          {battery.charge}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Food Allocation
            </CardTitle>
            <CardDescription>Set quantities for each food item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodItems.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">Available: {item.available}</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      min="0"
                      max={item.available}
                      placeholder="0"
                      value={foodQuantities[item.name] || ""}
                      onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Assignment Summary</CardTitle>
          <CardDescription>Review assignment details before confirming</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid md:grid-cols-5">
            <div>
              <Label>Rider</Label>
              <p className="font-medium">
                {selectedRider ? riders.find(r => r.id.toString() === selectedRider)?.name : "Not selected"}
              </p>
            </div>
            <div>
              <Label>Route</Label>
              <p className="font-medium">
                {selectedRoute ? routes.find(r => r.id.toString() === selectedRoute)?.name : "Not selected"}
              </p>
            </div>
            <div>
              <Label>Vehicle</Label>
              <p className="font-medium">
                {selectedVehicle ? vehicles.find(v => v.id.toString() === selectedVehicle)?.registration : "Not selected"}
              </p>
            </div>
            <div>
              <Label>Battery</Label>
              <p className="font-medium">
                {selectedBattery ? batteries.find(b => b.id.toString() === selectedBattery)?.imei : "Not selected"}
              </p>
            </div>
            <div>
              <Label>Total Items</Label>
              <p className="font-medium">
                {Object.values(foodQuantities).reduce((sum, qty) => sum + qty, 0)} items
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button 
              className="hover:bg-primary-hover bg-gradient-primary"
              disabled={!selectedRider || !selectedRoute || !selectedVehicle || !selectedBattery}
            >
              <Truck className="mr-2 w-4 h-4" />
              Assign Rider
            </Button>
            <Button variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignRider;