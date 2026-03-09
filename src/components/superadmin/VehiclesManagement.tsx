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
import { Plus, Truck, AlertTriangle, Edit, Wrench, Trash2, Battery, History, Eye, Loader2 } from "lucide-react";
import { useGetVehiclesQuery, useCreateVehicleMutation, useDeleteVehicleMutation } from "@/store/api/vehicleApi";
import { toast } from "sonner";
import type { VehicleCreate } from "@/store/api/vehicleApi";

// Temporary Mocks for what the API does not handle natively yet:
const batteries = [
  { id: 1, imei: "356938035643809", vehicleId: 1, type: "Lithium-ion 48V", capacity: "20Ah", installationDate: "2024-01-15", status: "Active", lastChecked: "2024-01-20" },
];

const serviceRecords = [
  { id: 1, vehicleId: 1, date: "2024-01-15", type: "Regular Maintenance", description: "Oil change, brake check, tire rotation", cost: 2500, mechanic: "Rajesh Kumar" },
];

const VehiclesManagement = () => {
  const { data: vehicles, isLoading, error } = useGetVehiclesQuery();
  const [createVehicle, { isLoading: isCreating }] = useCreateVehicleMutation();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [isBatteryOpen, setIsBatteryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const [formData, setFormData] = useState<VehicleCreate>({
    registration_no: "",
    status: "active",
  });

  const [issueData, setIssueData] = useState({ issueType: "", description: "" });
  const [batteryData, setBatteryData] = useState({ imei: "", type: "", capacity: "", installationDate: "", status: "Active" });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success';
      case 'in maintenance':
        return 'bg-warning';
      case 'out of service':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const handleAddVehicle = async () => {
    try {
      await createVehicle(formData).unwrap();
      toast.success("Vehicle successfully added!");
      setIsAddOpen(false);
      setFormData({ registration_no: "", status: "active" });
    } catch (err) {
      toast.error("Failed to add vehicle");
      console.error(err);
    }
  };

  const handleMarkIssue = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsIssueOpen(true);
  };

  const handleSubmitIssue = () => {
    setIsIssueOpen(false);
    setSelectedVehicle(null);
    setIssueData({ issueType: "", description: "" });
  };

  const handleRemoveVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsRemoveOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedVehicle?.id) {
      try {
        await deleteVehicle(selectedVehicle.id).unwrap();
        toast.success("Vehicle deleted successfully!");
        setIsRemoveOpen(false);
        setSelectedVehicle(null);
      } catch (err) {
        toast.error("Failed to remove vehicle");
        console.error(err);
      }
    }
  };

  const handleAddBattery = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsBatteryOpen(true);
  };

  const handleSubmitBattery = () => {
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
                  value={formData.registration_no}
                  onChange={(e) => setFormData(prev => ({ ...prev, registration_no: e.target.value }))}
                  placeholder="e.g., MH12AB1234"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in maintenance">In Maintenance</SelectItem>
                    <SelectItem value="out of service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddVehicle} disabled={!formData.registration_no || isCreating}>
                  {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-destructive text-center py-8">
              Failed to load vehicles. The backend API might be offline.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Rider</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No vehicles found.
                    </TableCell>
                  </TableRow>
                )}
                {vehicles?.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.registration_no}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getStatusColor(vehicle.status || "active")}
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vehicle.assigned_rider_id ? (
                        <Badge variant="secondary">Rider {vehicle.assigned_rider_id}</Badge>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
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
                          disabled={vehicle.status === "in maintenance"}
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
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isIssueOpen} onOpenChange={setIsIssueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Vehicle Issue</DialogTitle>
            <DialogDescription>
              Mark vehicle {selectedVehicle?.registration_no} as having an issue
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
              Are you sure you want to remove vehicle {selectedVehicle?.registration_no}? This action cannot be undone.
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
              Manage battery for vehicle {selectedVehicle?.registration_no}
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
              Service history for vehicle {selectedVehicle?.registration_no}
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