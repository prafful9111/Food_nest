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

const foodItems = [
  { name: "Classic Burger", available: 50 },
  { name: "Chicken Tacos", available: 30 },
  { name: "Fish & Chips", available: 25 },
  { name: "Caesar Salad", available: 20 },
];

const AssignRider = () => {
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
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
        <h1 className="text-3xl font-bold">Assign Rider</h1>
        <p className="text-muted-foreground">Assign riders to routes and allocate food inventory</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
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
                      <div className="flex items-center justify-between w-full">
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
                      <div className="flex items-center justify-between w-full">
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
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Food Allocation
            </CardTitle>
            <CardDescription>Set quantities for each food item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Available: {item.available}</p>
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
          <div className="grid gap-4 md:grid-cols-3">
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
              <Label>Total Items</Label>
              <p className="font-medium">
                {Object.values(foodQuantities).reduce((sum, qty) => sum + qty, 0)} items
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button 
              className="bg-gradient-primary hover:bg-primary-hover"
              disabled={!selectedRider || !selectedRoute}
            >
              <Truck className="h-4 w-4 mr-2" />
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