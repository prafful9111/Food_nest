import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Package, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: number;
  rider: string;
  riderId: string;
  item: string;
  quantity: number;
  currentStock: number;
  location: string;
  requestTime: string;
  priority: string;
  status: string;
  urgencyReason: string;
  assignedBy?: string;
  cookInstructions?: string;
  deliveredAt?: string;
  startedAt?: string;
}

const RefillRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [fulfillmentDetails, setFulfillmentDetails] = useState({
    estimatedTime: "",
    assignedCook: "",
    notes: ""
  });

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      rider: "Mike Thompson",
      riderId: "R001",
      item: "Vada Pav",
      quantity: 15,
      currentStock: 0,
      location: "Downtown Route A",
      requestTime: "2024-01-20 10:30 AM",
      priority: "high",
      status: "assigned",
      urgencyReason: "Completely out of stock, customers waiting",
      assignedBy: "Chef Sarah",
      cookInstructions: "Urgent priority - rider has customers waiting"
    },
    {
      id: 2,
      rider: "Sarah Wilson",
      riderId: "R002", 
      item: "Poha",
      quantity: 10,
      currentStock: 2,
      location: "Business District Route B",
      requestTime: "2024-01-20 10:45 AM",
      priority: "medium",
      status: "assigned",
      urgencyReason: "Running very low, need refill soon",
      assignedBy: "Chef Sarah",
      cookInstructions: "Normal priority refill"
    },
    {
      id: 3,
      rider: "David Chen",
      riderId: "R003",
      item: "Chai",
      quantity: 20,
      currentStock: 0,
      location: "University Route C",
      requestTime: "2024-01-20 11:00 AM",
      priority: "high",
      status: "delivered",
      urgencyReason: "Out of stock, high demand area",
      assignedBy: "Chef Sarah",
      deliveredAt: "2024-01-20 12:30 PM"
    }
  ]);

  const cooks = [
    { id: "C001", name: "Chef Kumar" },
    { id: "C002", name: "Chef Priya" },
    { id: "C003", name: "Chef Ahmed" },
    { id: "C004", name: "Chef Maria" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-warning text-warning-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'delivered': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const handleStartDelivery = (requestId: number) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'in-progress', startedAt: new Date().toLocaleString() }
        : req
    );
    
    setRequests(updatedRequests);
    
    toast({
      title: "Delivery Started",
      description: "You have started the delivery process",
    });
  };

  const handleRejectRequest = (requestId: number) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    );
    setRequests(updatedRequests);
    
    toast({
      title: "Request Rejected",
      description: "Refill request has been rejected",
      variant: "destructive"
    });
  };

  const handleCompleteDelivery = (requestId: number) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'delivered', deliveredAt: new Date().toLocaleString() }
        : req
    );
    setRequests(updatedRequests);
    
    toast({
      title: "Delivery Completed",
      description: "Refill has been successfully delivered to rider",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Assigned Refill Requests</h1>
        <p className="text-muted-foreground">Deliver refill requests assigned by cooks to riders</p>
      </div>

      <div className="gap-4 grid">
        {requests.map((request) => (
          <Card key={request.id} className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="font-semibold text-lg">{request.rider}</h3>
                    <Badge variant="outline" className="text-xs">
                      {request.riderId}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority} priority
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span><strong>{request.quantity}x {request.item}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{request.requestTime}</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Current Stock: </span>
                    <span className={request.currentStock <= 5 ? 'text-destructive font-medium' : 'text-success'}>
                      {request.currentStock} units
                    </span>
                  </div>

                  {request.urgencyReason && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reason: </span>
                      <span className="italic">{request.urgencyReason}</span>
                    </div>
                  )}

                  {request.assignedBy && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Assigned by: </span>
                      <span className="font-medium">{request.assignedBy}</span>
                    </div>
                  )}

                  {request.cookInstructions && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Instructions: </span>
                      <span className="italic">{request.cookInstructions}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {request.status === 'assigned' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartDelivery(request.id)}
                    >
                      Start Delivery
                    </Button>
                  )}
                  
                  {request.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCompleteDelivery(request.id)}
                    >
                      <CheckCircle className="mr-1 w-4 h-4" />
                      Mark Delivered
                    </Button>
                  )}
                  
                  {request.status === 'delivered' && (
                    <Badge variant="outline" className="bg-success text-success-foreground">
                      <CheckCircle className="mr-1 w-4 h-4" />
                      Delivered
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RefillRequests;