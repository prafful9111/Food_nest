import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "John Smith", email: "john@foodcart.com", role: "Rider", status: "Active" },
  { id: 2, name: "Sarah Johnson", email: "sarah@foodcart.com", role: "Cook", status: "Active" },
  { id: 3, name: "Mike Davis", email: "mike@foodcart.com", role: "Supervisor", status: "Active" },
  { id: 4, name: "Emily Brown", email: "emily@foodcart.com", role: "Rider", status: "Inactive" },
];

const UserManagement = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="hover:bg-primary-hover bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account for the system.</DialogDescription>
            </DialogHeader>

            {/* Basic Info */}
            <div className="gap-4 grid py-4">
              <div className="items-center gap-4 grid grid-cols-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="items-center gap-4 grid grid-cols-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" placeholder="user@email.com" className="col-span-3" />
              </div>
              <div className="items-center gap-4 grid grid-cols-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rider">Rider</SelectItem>
                    <SelectItem value="cook">Cook</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="kitchen-helper">Kitchen Helper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary Details */}
            <div className="my-2 pt-4 border-t border-border">
              <h4 className="mb-3 font-semibold text-muted-foreground text-sm tracking-wide">
                Salary Details
              </h4>

              <div className="gap-4 grid">
                {/* Row 1: Currency / Base Salary */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="currency" className="text-right">Currency</Label>
                  <Select>
                    <SelectTrigger id="currency" className="col-span-3">
                      <SelectValue placeholder="Choose currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="THB">THB — Thai Baht</SelectItem>
                      <SelectItem value="INR">INR — Indian Rupee</SelectItem>
                      <SelectItem value="USD">USD — US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="base-salary" className="text-right">Base Salary</Label>
                  <Input id="base-salary" type="number" placeholder="e.g., 25000" className="col-span-3" />
                </div>

                {/* Row 2: Frequency / Employment Type */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="frequency" className="text-right">Pay Frequency</Label>
                  <Select>
                    <SelectTrigger id="frequency" className="col-span-3">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="employment-type" className="text-right">Employment Type</Label>
                  <Select>
                    <SelectTrigger id="employment-type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="gig">Gig / On-demand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Row 3: VAT/Tax / Effective From */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="vat" className="text-right">Tax / VAT (%)</Label>
                  <Input id="vat" type="number" step="0.01" placeholder="e.g., 5" className="col-span-3" />
                </div>

                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="effective" className="text-right">Effective From</Label>
                  <Input id="effective" type="date" className="col-span-3" />
                </div>

                {/* Row 4: Overtime Eligible / Overtime Rate */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="ot-eligible" className="text-right">Overtime Eligible</Label>
                  <div className="flex items-center gap-3 col-span-3">
                    <Switch id="ot-eligible" />
                    <Input
                      id="ot-rate"
                      type="number"
                      step="0.01"
                      placeholder="OT Rate (% of base/hourly), e.g., 150"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Row 5: Allowances / Deductions */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="allowances" className="text-right">Allowances</Label>
                  <Input id="allowances" type="number" placeholder="Monthly total allowances" className="col-span-3" />
                </div>

                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="deductions" className="text-right">Deductions</Label>
                  <Input id="deductions" type="number" placeholder="Monthly total deductions" className="col-span-3" />
                </div>

                {/* Row 6: Tax ID (optional) */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="taxid" className="text-right">Tax ID (optional)</Label>
                  <Input id="taxid" placeholder="PAN / TIN / National Tax ID" className="col-span-3" />
                </div>

                {/* Bank Details */}
                <div className="bg-muted mt-2 p-3 rounded-lg">
                  <p className="mb-3 font-medium text-sm">Bank Details</p>
                  <div className="gap-4 grid">
                    <div className="items-center gap-4 grid grid-cols-4">
                      <Label htmlFor="acct-holder" className="text-right">Account Holder</Label>
                      <Input id="acct-holder" placeholder="Name as per bank" className="col-span-3" />
                    </div>
                    <div className="items-center gap-4 grid grid-cols-4">
                      <Label htmlFor="acct-no" className="text-right">Account No / IBAN</Label>
                      <Input id="acct-no" placeholder="XXXX-XXXX-XXXX" className="col-span-3" />
                    </div>
                    <div className="items-center gap-4 grid grid-cols-4">
                      <Label htmlFor="bank-name" className="text-right">Bank Name</Label>
                      <Input id="bank-name" placeholder="e.g., HDFC, SCB" className="col-span-3" />
                    </div>
                    <div className="items-center gap-4 grid grid-cols-4">
                      <Label htmlFor="ifsc" className="text-right">IFSC / SWIFT</Label>
                      <Input id="ifsc" placeholder="IFSC (India) / SWIFT (Intl.)" className="col-span-3" />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="items-center gap-4 grid grid-cols-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Input id="notes" placeholder="Any special pay terms / remarks" className="col-span-3" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
            </div>
          </DialogContent>

        </Dialog>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "default" : "secondary"}
                      className={user.status === "Active" ? "bg-success" : ""}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default UserManagement;