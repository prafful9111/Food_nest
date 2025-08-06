import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChefHat, Clock, AlertCircle, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CookCoordination = () => {
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    cook: "",
    item: "",
    quantity: "",
    priority: "",
    notes: ""
  });

  const cooksStatus = [
    {
      id: "C001",
      name: "Chef Kumar",
      status: "active",
      currentTasks: [
        { item: "Vada Pav", quantity: 25, estimatedTime: "15 mins", priority: "high" },
        { item: "Chai", quantity: 30, estimatedTime: "10 mins", priority: "medium" }
      ],
      workload: "high",
      shiftEnd: "6:00 PM",
      location: "Kitchen A",
      lastActive: "2 mins ago"
    },
    {
      id: "C002", 
      name: "Chef Priya",
      status: "active",
      currentTasks: [
        { item: "Poha", quantity: 20, estimatedTime: "12 mins", priority: "medium" }
      ],
      workload: "medium",
      shiftEnd: "5:30 PM",
      location: "Kitchen B",
      lastActive: "1 min ago"
    },
    {
      id: "C003",
      name: "Chef Ahmed",
      status: "break",
      currentTasks: [],
      workload: "low",
      shiftEnd: "7:00 PM",
      location: "Kitchen A",
      lastActive: "15 mins ago"
    },
    {
      id: "C004",
      name: "Chef Maria",
      status: "active",
      currentTasks: [
        { item: "Water Bottle", quantity: 50, estimatedTime: "5 mins", priority: "low" },
        { item: "Poha", quantity: 15, estimatedTime: "8 mins", priority: "high" }
      ],
      workload: "high",
      shiftEnd: "6:30 PM", 
      location: "Kitchen B",
      lastActive: "just now"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      item: "Vada Pav",
      quantity: 30,
      assignedTo: "Chef Kumar",
      priority: "high",
      estimatedCompletion: "3:45 PM",
      notes: "For downtown route - high demand area",
      status: "in-progress"
    },
    {
      id: 2,
      item: "Chai",
      quantity: 40,
      assignedTo: "Chef Priya",
      priority: "medium",
      estimatedCompletion: "4:00 PM",
      notes: "Regular restock",
      status: "pending"
    }
  ];

  const messages = [
    {
      id: 1,
      from: "Chef Kumar",
      message: "Vada Pav batch ready - 25 units available for pickup",
      time: "2 mins ago",
      type: "update"
    },
    {
      id: 2,
      from: "Coordinator",
      message: "Need urgent Poha preparation - downtown route running low",
      time: "5 mins ago",
      type: "request"
    },
    {
      id: 3,
      from: "Chef Maria",
      message: "Water bottle restock completed - 50 units ready",
      time: "8 mins ago",
      type: "completion"
    }
  ];

  const foodItems = ["Poha", "Vada Pav", "Chai", "Water Bottle"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'break': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const handleSendRequest = () => {
    if (!newRequest.cook || !newRequest.item || !newRequest.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Sent",
      description: `Production request sent to ${cooksStatus.find(c => c.id === newRequest.cook)?.name}`,
    });

    setNewRequest({ cook: "", item: "", quantity: "", priority: "", notes: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Cook Coordination</h1>
          <p className="text-muted-foreground">Coordinate with kitchen staff and manage production requests</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 w-4 h-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Production Request</DialogTitle>
              <DialogDescription>
                Send a new production request to kitchen staff
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cook">Assign to Cook</Label>
                <Select onValueChange={(value) => setNewRequest(prev => ({ ...prev, cook: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cook" />
                  </SelectTrigger>
                  <SelectContent>
                    {cooksStatus.filter(cook => cook.status === 'active').map((cook) => (
                      <SelectItem key={cook.id} value={cook.id}>
                        {cook.name} - {cook.workload} workload
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="item">Food Item</Label>
                <Select onValueChange={(value) => setNewRequest(prev => ({ ...prev, item: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food item" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodItems.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional instructions or context"
                  value={newRequest.notes}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <Button onClick={handleSendRequest} className="w-full">
                Send Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        {/* Cook Status */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Kitchen Staff Status</CardTitle>
            <CardDescription>Real-time cook availability and workload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cooksStatus.map((cook) => (
                <div key={cook.id} className="space-y-3 bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <ChefHat className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">{cook.name}</h4>
                        <p className="text-muted-foreground text-sm">{cook.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={getStatusColor(cook.status)}>
                        {cook.status}
                      </Badge>
                      <Badge variant="outline" className={getWorkloadColor(cook.workload)}>
                        {cook.workload}
                      </Badge>
                    </div>
                  </div>
                  
                  {cook.currentTasks.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Current Tasks:</p>
                      {cook.currentTasks.map((task, index) => (
                        <div key={index} className="flex justify-between items-center bg-background p-2 rounded text-sm">
                          <span>{task.quantity}x {task.item}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <span className="text-muted-foreground">{task.estimatedTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Shift ends: {cook.shiftEnd}</span>
                    <span>Last seen: {cook.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages & Communication */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Communication</CardTitle>
            <CardDescription>Recent messages and updates from kitchen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium text-sm">{message.from}</span>
                    <span className="text-muted-foreground text-xs">{message.time}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Active Production Requests</CardTitle>
          <CardDescription>Track ongoing and pending production requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center bg-muted p-4 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-medium">{request.quantity}x {request.item}</h4>
                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    <Badge variant="outline">
                      {request.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <p>Assigned to: {request.assignedTo}</p>
                    <p>Expected completion: {request.estimatedCompletion}</p>
                    {request.notes && <p>Notes: {request.notes}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-1 w-4 h-4" />
                    Message Cook
                  </Button>
                  {request.status === 'in-progress' && (
                    <Button size="sm">
                      <Clock className="mr-1 w-4 h-4" />
                      Check Status
                    </Button>
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

export default CookCoordination;