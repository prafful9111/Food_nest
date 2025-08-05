import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, Plus, X, Map } from "lucide-react";
import MapCanvas from "@/components/ui/MapCanvas";
import AsyncSelect from "react-select/async";

const routes = [
  {
    id: 1,
    name: "Downtown Route A",
    status: "Active",
    rider: "John Smith",
    stops: [
      "City Hall",
      "Central Park",
      "Business District",
      "Shopping Mall",
      "University Campus"
    ],
    duration: "4 hours",
    lastUpdate: "2 hours ago"
  },
  {
    id: 2,
    name: "Suburban Route B",
    status: "Active",
    rider: "Mike Davis",
    stops: [
      "Residential Area A",
      "Community Center",
      "Local School",
      "Grocery Plaza",
      "Medical Center"
    ],
    duration: "3.5 hours",
    lastUpdate: "1 hour ago"
  },
  {
    id: 3,
    name: "Beach Route C",
    status: "Inactive",
    rider: "Unassigned",
    stops: [
      "Marina",
      "Beach Boardwalk",
      "Pier Restaurant",
      "Surf Shop",
      "Beach Hotel"
    ],
    duration: "5 hours",
    lastUpdate: "1 day ago"
  }
];

const RoutesManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [routeName, setRouteName] = useState("");
  const [region, setRegion] = useState("");
  const [stops, setStops] = useState<string[]>([""]);
  const [pins, setPins] = useState<{ id: string, x: number, y: number, name: string }[]>([]);
  const [activeTab, setActiveTab] = useState("manual");

  const handleAddStop = () => {
    setStops([...stops, ""]);
  };

  const handleRemoveStop = (index: number) => {
    if (stops.length > 1) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  

  const handleStopChange = (index: number, value: string) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handlePinNameChange = (pinId: string, name: string) => {
    setPins(pins.map(pin => pin.id === pinId ? { ...pin, name } : pin));
  };

  const handleCreateRoute = () => {
    // Create route logic here
    setIsOpen(false);
    setRouteName("");
    setRegion("");
    setStops([""]);
    setPins([]);
  };


  const geocodeLocation = async (query: string) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Routes Management</h1>
          <p className="text-muted-foreground">Manage food cart routes and stops</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="hover:bg-primary-hover bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Create New Route
              </DialogTitle>
              <DialogDescription>
                Add a new route with multiple stops using manual entry or interactive map
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="gap-4 grid grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    placeholder="Enter route name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Assigned Region</Label>
                  <Input
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Enter region name"
                  />
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="map">Interactive Map</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Route Stops</Label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddStop}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {stops.map((stop, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={stop}
                            onChange={(e) => handleStopChange(index, e.target.value)}
                            placeholder={`Stop ${index + 1}`}
                          />
                          {stops.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveStop(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="map" className="space-y-4">
                  <div className="gap-4 grid md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start">Start Point</Label>
                      <Input
                        id="start"
                        placeholder="Search for start location"
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            const result = await geocodeLocation((e.target as HTMLInputElement).value);
                            if (result) {
                              const newPin = {
                                id: `start-${Date.now()}`,
                                name: "Start Point",
                                x: result.lng * 10, // scale to fit your canvas
                                y: result.lat * 10,
                              };
                              setPins([newPin, ...pins]); // prepend
                            }
                          }
                        }}
                      />

                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end">End Point</Label>
                      <Input
                        id="end"
                        placeholder="Search for end location"
                        onKeyDown={async (e) => {
                          if (e.key === "Enter") {
                            const result = await geocodeLocation((e.target as HTMLInputElement).value);
                            if (result) {
                              const newPin = {
                                id: `end-${Date.now()}`,
                                name: "End Point",
                                x: result.lng * 10,
                                y: result.lat * 10,
                              };
                              setPins((prev) => {
                                // remove old "End Point" pin if it exists
                                const filtered = prev.filter(p => !p.id.startsWith("end-"));
                                return [...filtered, newPin];
                              });
                            }
                          }
                        }}
                      />

                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkpoint">Checkpoints</Label>
                    <Input
                      id="checkpoint"
                      placeholder="Search and add checkpoint"
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          const value = (e.target as HTMLInputElement).value;
                          const result = await geocodeLocation(value);
                          if (result) {
                            const newPin = {
                              id: `cp-${Date.now()}`,
                              name: value,
                              x: result.lng * 10,
                              y: result.lat * 10,
                            };
                            setPins((prev) => [...prev, newPin]);
                          }
                        }
                      }}
                    />

                  </div>

                  <p className="text-muted-foreground text-sm">
                    Searched locations will be pinned on the map. You can also drag them to adjust.
                  </p>

                  <MapCanvas
                    pins={pins}
                    onPinsChange={setPins}
                    onPinNameChange={handlePinNameChange}
                  />
                </TabsContent>

              </Tabs>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={handleCreateRoute}
                  disabled={!routeName || !region || (activeTab === "manual" ? stops.filter(s => s.trim()).length === 0 : pins.length === 0)}
                >
                  Create Route
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
          <CardTitle>Routes Overview</CardTitle>
          <CardDescription>All configured routes and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Stops</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{route.name.includes("Downtown") ? "Central" : route.name.includes("Suburban") ? "North" : "South"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{route.stops.length} stops</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={route.status === "Active" ? "default" : "secondary"}
                      className={route.status === "Active" ? "bg-success" : ""}
                    >
                      {route.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="gap-6 grid">
        {routes.map((route) => (
          <Card key={route.id} className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{route.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {route.rider}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={route.status === "Active" ? "default" : "secondary"}
                    className={route.status === "Active" ? "bg-success" : ""}
                  >
                    {route.status}
                  </Badge>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="flex items-center gap-2 mb-2 font-medium">
                    <MapPin className="w-4 h-4" />
                    Route Stops
                  </h4>
                  <div className="gap-2 grid sm:grid-cols-2 lg:grid-cols-3">
                    {route.stops.map((stop, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-muted p-2 rounded-lg"
                      >
                        <div className="flex justify-center items-center bg-primary rounded-full w-6 h-6 font-bold text-white text-xs">
                          {index + 1}
                        </div>
                        <span className="text-sm">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-muted-foreground text-sm">
                  <span>Last updated: {route.lastUpdate}</span>
                  <span>{route.stops.length} stops total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoutesManagement;