import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, XCircle } from "lucide-react";

const availableItems = [
  { id: 1, name: "Vada Pav", current: 3, available: 0 },
  { id: 2, name: "Poha", current: 2, available: 0 },
  { id: 3, name: "Chai", current: 5, available: 0 },
  { id: 4, name: "Water Bottle", current: 8, available: 0 },
];

const requestHistory = [
  {
    id: 1,
    item: "Vada Pav",
    quantity: 15,
    reason: "Completely out of stock, customers waiting",
    status: "forwarded",
    requestTime: "2 hours ago",
    responseTime: "1 hour ago"
  },
  {
    id: 2,
    item: "Chai",
    quantity: 20,
    reason: "Running low during afternoon rush",
    status: "pending",
    requestTime: "30 minutes ago",
    responseTime: null
  },
  {
    id: 3,
    item: "Poha",
    quantity: 12,
    reason: "Out of stock, morning rush demand",
    status: "delivered",
    requestTime: "3 hours ago",
    responseTime: "2 hours ago"
  },
];

const RequestMore = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ selectedItem, quantity, reason });
    
    // Reset form
    setSelectedItem("");
    setQuantity("");
    setReason("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'forwarded':
        return <Badge className="bg-primary"><Clock className="mr-1 w-3 h-3" />Forwarded to Cook</Badge>;
      case 'pending':
        return <Badge className="bg-warning"><Clock className="mr-1 w-3 h-3" />Pending</Badge>;
      case 'delivered':
        return <Badge className="bg-success"><CheckCircle className="mr-1 w-3 h-3" />Delivered</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive"><XCircle className="mr-1 w-3 h-3" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Request Refill</h1>
        <p className="text-muted-foreground">Request refill from cook when items are out of stock</p>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Request
            </CardTitle>
            <CardDescription>Submit a refill request to the cook</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item">Food Item</Label>
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food item" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableItems.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        <div className="flex justify-between items-center w-full">
                          <span>{item.name}</span>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline">
                              Current: {item.current}
                            </Badge>
                            <Badge variant="outline">
                              Available: {item.available}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Requested</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Enter quantity needed"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {selectedItem && (
                  <p className="text-destructive text-sm">
                    Current stock: {availableItems.find(item => item.id.toString() === selectedItem)?.current} items (Out of stock)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain the urgency (e.g., completely out of stock, customers waiting, high demand)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="hover:bg-primary-hover bg-gradient-primary w-full"
                disabled={!selectedItem || !quantity || !reason}
              >
                Send Request to Cook
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
            <CardDescription>Your current food item levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Current stock: {item.current} items
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline"
                      className="bg-destructive text-white"
                    >
                      Out of Stock
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Request History</CardTitle>
          <CardDescription>Your previous food requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requestHistory.map((request) => (
              <div key={request.id} className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{request.item}</h4>
                    <p className="text-muted-foreground text-sm">
                      Quantity: {request.quantity} items
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                
                <p className="mb-2 text-sm">{request.reason}</p>
                
                <div className="flex justify-between items-center text-muted-foreground text-xs">
                  <span>Requested: {request.requestTime}</span>
                  {request.responseTime && (
                    <span>Responded: {request.responseTime}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestMore;