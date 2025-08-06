import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, Package, CheckCircle, X, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RiderRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [forwardDetails, setForwardDetails] = useState({
    coordinator: "",
    instructions: ""
  });

  const [requests, setRequests] = useState([
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
      status: "pending",
      reason: "Completely out of stock, customers waiting"
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
      status: "pending",
      reason: "Running very low, need refill soon"
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
      status: "forwarded",
      reason: "Out of stock, high demand area"
    }
  ]);

  const coordinators = [
    { id: "RC001", name: "Alex Martinez" },
    { id: "RC002", name: "Lisa Rodriguez" },
    { id: "RC003", name: "James Wilson" }
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
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'forwarded': return 'bg-primary text-primary-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const handleForwardToCoordinator = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: 'forwarded', assignedCoordinator: forwardDetails.coordinator }
        : req
    );
    
    setRequests(updatedRequests);
    setSelectedRequest(null);
    setForwardDetails({ coordinator: "", instructions: "" });
    
    toast({
      title: "Request Forwarded",
      description: `Request has been forwarded to ${coordinators.find(c => c.id === forwardDetails.coordinator)?.name}`,
    });
  };

  const handleRejectRequest = (requestId: number) => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    );
    setRequests(updatedRequests);
    
    toast({
      title: "Request Rejected",
      description: "Rider request has been rejected",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Rider Requests</h1>
        <p className="text-muted-foreground">Manage refill requests from riders</p>
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
                    <span className={request.currentStock <= 2 ? 'text-destructive font-medium' : 'text-success'}>
                      {request.currentStock} units
                    </span>
                  </div>

                  {request.reason && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Reason: </span>
                      <span className="italic">{request.reason}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {request.status === 'pending' && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedRequest(request)}
                          >
                            <User className="mr-1 w-4 h-4" />
                            Forward to Coordinator
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Forward to Refill Coordinator</DialogTitle>
                            <DialogDescription>
                              Assign this request to a refill coordinator for fulfillment
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="coordinator" className="font-medium text-sm">Assign to Coordinator</label>
                              <Select 
                                onValueChange={(value) => 
                                  setForwardDetails(prev => ({ ...prev, coordinator: value }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a coordinator" />
                                </SelectTrigger>
                                <SelectContent>
                                  {coordinators.map((coordinator) => (
                                    <SelectItem key={coordinator.id} value={coordinator.id}>
                                      {coordinator.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label htmlFor="instructions" className="font-medium text-sm">Instructions</label>
                              <Textarea
                                id="instructions"
                                placeholder="Special instructions for the coordinator"
                                value={forwardDetails.instructions}
                                onChange={(e) => 
                                  setForwardDetails(prev => ({ ...prev, instructions: e.target.value }))
                                }
                              />
                            </div>
                            <Button 
                              onClick={handleForwardToCoordinator}
                              disabled={!forwardDetails.coordinator}
                              className="w-full"
                            >
                              Forward Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  
                  {request.status === 'forwarded' && (
                    <Badge variant="outline" className="bg-primary text-primary-foreground">
                      Forwarded to Coordinator
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

export default RiderRequests;