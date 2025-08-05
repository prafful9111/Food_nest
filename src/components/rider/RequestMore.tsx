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
  { id: 1, name: "Classic Burger", current: 8, available: 25 },
  { id: 2, name: "Chicken Tacos", current: 7, available: 18 },
  { id: 3, name: "Fish & Chips", current: 4, available: 12 },
  { id: 4, name: "Caesar Salad", current: 5, available: 15 },
];

const requestHistory = [
  {
    id: 1,
    item: "Classic Burger",
    quantity: 10,
    reason: "High demand in business district",
    status: "approved",
    requestTime: "2 hours ago",
    responseTime: "1 hour ago"
  },
  {
    id: 2,
    item: "Chicken Tacos",
    quantity: 8,
    reason: "Running low during lunch rush",
    status: "pending",
    requestTime: "30 minutes ago",
    responseTime: null
  },
  {
    id: 3,
    item: "Fish & Chips",
    quantity: 5,
    reason: "Customer requests at current location",
    status: "rejected",
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
      case 'approved':
        return <Badge className="bg-success"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Request More Food</h1>
        <p className="text-muted-foreground">Request additional food items for your cart</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Request
            </CardTitle>
            <CardDescription>Submit a request for additional food items</CardDescription>
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
                        <div className="flex items-center justify-between w-full">
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
                  max={selectedItem ? availableItems.find(item => item.id.toString() === selectedItem)?.available : 100}
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {selectedItem && (
                  <p className="text-sm text-muted-foreground">
                    Available in stock: {availableItems.find(item => item.id.toString() === selectedItem)?.available} items
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request</Label>
                <Textarea
                  id="reason"
                  placeholder="Explain why you need these items (e.g., high customer demand, running low, special event)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-primary-hover"
                disabled={!selectedItem || !quantity || !reason}
              >
                Submit Request
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
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current stock: {item.current} items
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline"
                      className={
                        item.current <= 5 ? "bg-destructive text-white" :
                        item.current <= 10 ? "bg-warning text-white" :
                        "bg-success text-white"
                      }
                    >
                      {item.current <= 5 ? "Critical" :
                       item.current <= 10 ? "Low" : "Good"}
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
              <div key={request.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{request.item}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {request.quantity} items
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                
                <p className="text-sm mb-2">{request.reason}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
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