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
import { Plus, Truck, AlertTriangle, Edit, Wrench } from "lucide-react";

const vehicles = [
  {
    id: 1,
    registrationNo: "MH12AB1234",
    serviceDate: "2024-01-15",
    status: "Available",
    assignedRider: null,
    notes: "Recent maintenance completed"
  },
  {
    id: 2,
    registrationNo: "MH12CD5678",
    serviceDate: "2024-01-10",
    status: "In Use",
    assignedRider: "John Smith",
    notes: "Good condition"
  },
  {
    id: 3,
    registrationNo: "MH12EF9012",
    serviceDate: "2023-12-20",
    status: "Issue",
    assignedRider: null,
    notes: "Puncture repair needed"
  },
];

const riders = [
  { id: 1, name: "John Smith", available: false },
  { id: 2, name: "Mike Davis", available: true },
  { id: 3, name: "Sarah Johnson", available: true },
];

const VehiclesManagement = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicles Management</h1>
          <p className="text-muted-foreground">Manage fleet vehicles and track their status</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
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
            <Truck className="h-5 w-5" />
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
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkIssue(vehicle)}
                        disabled={vehicle.status === "Issue"}
                      >
                        <AlertTriangle className="h-4 w-4" />
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
    </div>
  );
};

export default VehiclesManagement;