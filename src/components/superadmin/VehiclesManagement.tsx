import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Truck, AlertTriangle, Edit, Wrench, Trash2, Battery, History, Eye } from "lucide-react";

const vehicles = [
  {
    id: 1,
    registrationNo: "MH12AB1234",
    serviceDate: "2024-01-15",
    status: "Available",
    assignedRider: null,
    notes: "Recent maintenance completed",
    batteryIMEI: "356938035643809"
  },
  {
    id: 2,
    registrationNo: "MH12CD5678",
    serviceDate: "2024-01-10",
    status: "In Use",
    assignedRider: "John Smith",
    notes: "Good condition",
    batteryIMEI: "356938035643810"
  },
  {
    id: 3,
    registrationNo: "MH12EF9012",
    serviceDate: "2023-12-20",
    status: "Issue",
    assignedRider: null,
    notes: "Puncture repair needed",
    batteryIMEI: null
  },
];

const batteries = [
  {
    id: 1,
    imei: "356938035643809",
    vehicleId: 1,
    type: "Lithium-ion 48V",
    capacity: "20Ah",
    installationDate: "2024-01-15",
    status: "Active",
    lastChecked: "2024-01-20"
  },
  {
    id: 2,
    imei: "356938035643810", 
    vehicleId: 2,
    type: "Lithium-ion 48V",
    capacity: "20Ah",
    installationDate: "2024-01-10",
    status: "Active",
    lastChecked: "2024-01-18"
  }
];

const serviceRecords = [
  {
    id: 1,
    vehicleId: 1,
    date: "2024-01-15",
    type: "Regular Maintenance",
    description: "Oil change, brake check, tire rotation",
    cost: 2500,
    mechanic: "Rajesh Kumar"
  },
  {
    id: 2,
    vehicleId: 1,
    date: "2023-12-01",
    type: "Repair",
    description: "Chain replacement",
    cost: 800,
    mechanic: "Suresh Patel"
  },
  {
    id: 3,
    vehicleId: 2,
    date: "2024-01-10",
    type: "Regular Maintenance", 
    description: "General service and battery check",
    cost: 2200,
    mechanic: "Rajesh Kumar"
  },
  {
    id: 4,
    vehicleId: 3,
    date: "2023-12-20",
    type: "Repair",
    description: "Puncture repair and tire replacement",
    cost: 1200,
    mechanic: "Amit Singh"
  }
];

const riders = [
  { id: 1, name: "John Smith", available: false },
  { id: 2, name: "Mike Davis", available: true },
  { id: 3, name: "Sarah Johnson", available: true },
];

const VehiclesManagement = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [isBatteryOpen, setIsBatteryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [formData, setFormData] = useState({
    registrationNo: "",
    serviceDate: "",
    status: "Available",
    notes: ""
  });
  const [issueData, setIssueData] = useState({
    issueType: "",
    description: ""
  });
  const [batteryData, setBatteryData] = useState({
    imei: "",
    type: "",
    capacity: "",
    installationDate: "",
    status: "Active"
  });

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

  const handleAddVehicle = () => {
    // Add vehicle logic here
    setIsAddOpen(false);
    setFormData({ registrationNo: "", serviceDate: "", status: "Available", notes: "" });
  };

  const handleMarkIssue = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsIssueOpen(true);
  };

  const handleSubmitIssue = () => {
    // Submit issue logic here
    setIsIssueOpen(false);
    setSelectedVehicle(null);
    setIssueData({ issueType: "", description: "" });
  };

  const handleRemoveVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsRemoveOpen(true);
  };

  const handleConfirmRemove = () => {
    // Remove vehicle logic here
    setIsRemoveOpen(false);
    setSelectedVehicle(null);
  };

  const handleAddBattery = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsBatteryOpen(true);
  };

  const handleSubmitBattery = () => {
    // Add battery logic here
    setIsBatteryOpen(false);
    setSelectedVehicle(null);
    setBatteryData({ imei: "", type: "", capacity: "", installationDate: "", status: "Active" });
  };

  const handleViewService = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsServiceOpen(true);
  };

  const getVehicleServiceRecords = (vehicleId: number) => {
    return serviceRecords.filter(record => record.vehicleId === vehicleId);
  };

  const getVehicleBattery = (vehicleId: number) => {
    return batteries.find(battery => battery.vehicleId === vehicleId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Vehicles Management</h1>
          <p className="text-muted-foreground">Manage fleet vehicles and track their status</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="hover:bg-primary-hover bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                Register a new vehicle to the fleet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNo">Registration Number</Label>
                <Input
                  id="registrationNo"
                  value={formData.registrationNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationNo: e.target.value }))}
                  placeholder="e.g., MH12AB1234"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceDate">Last Service Date</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceDate: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Issue">Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes about the vehicle"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddVehicle} disabled={!formData.registrationNo}>
                  Add Vehicle
                </Button>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Fleet Overview
          </CardTitle>
          <CardDescription>Track all vehicles and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration No.</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Rider</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.registrationNo}</TableCell>
                  <TableCell>{vehicle.serviceDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(vehicle.status)}
                    >
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vehicle.assignedRider ? (
                      <Badge variant="secondary">{vehicle.assignedRider}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={vehicle.notes}>
                    {vehicle.notes}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkIssue(vehicle)}
                        disabled={vehicle.status === "Issue"}
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddBattery(vehicle)}
                      >
                        <Battery className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewService(vehicle)}
                      >
                        <History className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRemoveVehicle(vehicle)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isIssueOpen} onOpenChange={setIsIssueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Vehicle Issue</DialogTitle>
            <DialogDescription>
              Mark vehicle {selectedVehicle?.registrationNo} as having an issue
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select value={issueData.issueType} onValueChange={(value) => setIssueData(prev => ({ ...prev, issueType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Puncture">Puncture</SelectItem>
                  <SelectItem value="Maintenance">Maintenance Required</SelectItem>
                  <SelectItem value="Breakdown">Breakdown</SelectItem>
                  <SelectItem value="Accident">Accident</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={issueData.description}
                onChange={(e) => setIssueData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the issue in detail"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmitIssue} disabled={!issueData.issueType}>
                Report Issue
              </Button>
              <Button variant="outline" onClick={() => setIsIssueOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Vehicle Dialog */}
      <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove vehicle {selectedVehicle?.registrationNo}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleConfirmRemove} variant="destructive">
              Remove Vehicle
            </Button>
            <Button variant="outline" onClick={() => setIsRemoveOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Battery Management Dialog */}
      <Dialog open={isBatteryOpen} onOpenChange={setIsBatteryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Battery Management</DialogTitle>
            <DialogDescription>
              Manage battery for vehicle {selectedVehicle?.registrationNo}
            </DialogDescription>
          </DialogHeader>
          
          {selectedVehicle && getVehicleBattery(selectedVehicle.id) && (
            <div className="bg-muted/50 mb-4 p-4 border rounded-lg">
              <h4 className="mb-2 font-medium">Current Battery</h4>
              <div className="space-y-1 text-sm">
                <p><strong>IMEI:</strong> {getVehicleBattery(selectedVehicle.id)?.imei}</p>
                <p><strong>Type:</strong> {getVehicleBattery(selectedVehicle.id)?.type}</p>
                <p><strong>Capacity:</strong> {getVehicleBattery(selectedVehicle.id)?.capacity}</p>
                <p><strong>Status:</strong> {getVehicleBattery(selectedVehicle.id)?.status}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imei">Battery IMEI Number</Label>
              <Input
                id="imei"
                value={batteryData.imei}
                onChange={(e) => setBatteryData(prev => ({ ...prev, imei: e.target.value }))}
                placeholder="e.g., 356938035643809"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="batteryType">Battery Type</Label>
              <Select value={batteryData.type} onValueChange={(value) => setBatteryData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select battery type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lithium-ion 48V">Lithium-ion 48V</SelectItem>
                  <SelectItem value="Lithium-ion 60V">Lithium-ion 60V</SelectItem>
                  <SelectItem value="Lead Acid 48V">Lead Acid 48V</SelectItem>
                  <SelectItem value="Lead Acid 60V">Lead Acid 60V</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Battery Capacity</Label>
              <Input
                id="capacity"
                value={batteryData.capacity}
                onChange={(e) => setBatteryData(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="e.g., 20Ah"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="batteryInstallDate">Installation Date</Label>
              <Input
                id="batteryInstallDate"
                type="date"
                value={batteryData.installationDate}
                onChange={(e) => setBatteryData(prev => ({ ...prev, installationDate: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="batteryStatus">Battery Status</Label>
              <Select value={batteryData.status} onValueChange={(value) => setBatteryData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Faulty">Faulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmitBattery} disabled={!batteryData.imei || !batteryData.type}>
                {selectedVehicle && getVehicleBattery(selectedVehicle.id) ? 'Update Battery' : 'Add Battery'}
              </Button>
              <Button variant="outline" onClick={() => setIsBatteryOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Records Dialog */}
      <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Service Records</DialogTitle>
            <DialogDescription>
              Service history for vehicle {selectedVehicle?.registrationNo}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedVehicle && getVehicleServiceRecords(selectedVehicle.id).length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Cost (₹)</TableHead>
                    <TableHead>Mechanic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getVehicleServiceRecords(selectedVehicle.id).map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <Badge variant={record.type === 'Regular Maintenance' ? 'secondary' : 'outline'}>
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>₹{record.cost.toLocaleString()}</TableCell>
                      <TableCell>{record.mechanic}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-muted-foreground text-center">
                No service records found for this vehicle
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setIsServiceOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehiclesManagement;