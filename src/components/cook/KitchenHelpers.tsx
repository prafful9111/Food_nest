import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Helper {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  shift: string;
  status: "active" | "break" | "offline";
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed";
  estimatedTime: string;
  assignedAt: string;
}

const mockHelpers: Helper[] = [
  {
    id: "1",
    name: "Maria Santos",
    avatar: "/api/placeholder/40/40",
    email: "maria@foodnest.com",
    phone: "+1234567890",
    shift: "Morning (6AM - 2PM)",
    status: "active",
    tasks: [
      {
        id: "t1",
        title: "Prep vegetables for lunch",
        description: "Cut onions, tomatoes, and peppers for today's specials",
        priority: "high",
        status: "in-progress",
        estimatedTime: "30 mins",
        assignedAt: "9:00 AM"
      },
      {
        id: "t2",
        title: "Clean prep station",
        description: "Sanitize all prep surfaces and organize tools",
        priority: "medium",
        status: "completed",
        estimatedTime: "15 mins",
        assignedAt: "8:30 AM"
      }
    ]
  },
  {
    id: "2",
    name: "James Wilson",
    avatar: "/api/placeholder/40/40",
    email: "james@foodnest.com",
    phone: "+1234567891",
    shift: "Evening (2PM - 10PM)",
    status: "break",
    tasks: [
      {
        id: "t3",
        title: "Stock inventory",
        description: "Check and restock dry goods and spices",
        priority: "medium",
        status: "pending",
        estimatedTime: "45 mins",
        assignedAt: "2:30 PM"
      }
    ]
  },
  {
    id: "3",
    name: "Lisa Chen",
    avatar: "/api/placeholder/40/40",
    email: "lisa@foodnest.com",
    phone: "+1234567892",
    shift: "Morning (6AM - 2PM)",
    status: "active",
    tasks: [
      {
        id: "t4",
        title: "Prepare marinades",
        description: "Mix marinades for tomorrow's meat preparations",
        priority: "low",
        status: "completed",
        estimatedTime: "20 mins",
        assignedAt: "10:00 AM"
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "text-success";
    case "break": return "text-warning";
    case "offline": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active": return "bg-success/10 text-success hover:bg-success/20";
    case "break": return "bg-warning/10 text-warning hover:bg-warning/20";
    case "offline": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-destructive";
    case "medium": return "text-warning";
    case "low": return "text-success";
    default: return "text-muted-foreground";
  }
};

const getTaskStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return CheckCircle;
    case "in-progress": return Clock;
    case "pending": return AlertCircle;
    default: return AlertCircle;
  }
};

const KitchenHelpers = () => {
  const activeHelpers = mockHelpers.filter(helper => helper.status === "active").length;
  const totalTasks = mockHelpers.reduce((acc, helper) => acc + helper.tasks.length, 0);
  const completedTasks = mockHelpers.reduce((acc, helper) => 
    acc + helper.tasks.filter(task => task.status === "completed").length, 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Kitchen Helpers</h1>
        <p className="text-muted-foreground">Manage your kitchen staff and their tasks</p>
      </div>

      {/* Statistics */}
      <div className="gap-6 grid md:grid-cols-3">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Helpers</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{activeHelpers}</div>
            <p className="text-muted-foreground text-xs">out of {mockHelpers.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Tasks</CardTitle>
            <Clock className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalTasks}</div>
            <p className="text-muted-foreground text-xs">assigned today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed</CardTitle>
            <CheckCircle className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{completedTasks}</div>
            <p className="text-muted-foreground text-xs">of {totalTasks} tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Helpers List */}
      <div className="gap-6 grid">
        {mockHelpers.map((helper) => (
          <Card key={helper.id} className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={helper.avatar} />
                    <AvatarFallback>{helper.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{helper.name}</CardTitle>
                    <CardDescription>{helper.email}</CardDescription>
                    <p className="text-muted-foreground text-sm">{helper.phone}</p>
                    <p className="font-medium text-sm">{helper.shift}</p>
                  </div>
                </div>
                <Badge className={getStatusBadge(helper.status)}>
                  {helper.status.charAt(0).toUpperCase() + helper.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Current Tasks</h4>
                  <Badge variant="outline">{helper.tasks.length} tasks</Badge>
                </div>
                
                {helper.tasks.length > 0 ? (
                  <div className="space-y-3">
                    {helper.tasks.map((task) => {
                      const StatusIcon = getTaskStatusIcon(task.status);
                      return (
                        <div key={task.id} className="bg-background/50 p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <StatusIcon className={`h-4 w-4 ${getStatusColor(task.status)}`} />
                              <h5 className="font-medium">{task.title}</h5>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(task.priority)}
                              >
                                {task.priority}
                              </Badge>
                              <Badge variant="secondary">
                                {task.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                          <p className="mb-2 text-muted-foreground text-sm">{task.description}</p>
                          <div className="flex justify-between items-center text-muted-foreground text-xs">
                            <span>Assigned: {task.assignedAt}</span>
                            <Badge 
                              variant={task.status === "completed" ? "default" : "outline"}
                              className="text-xs"
                            >
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="py-4 text-muted-foreground text-center">No tasks assigned</p>
                )}
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Assign Task
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KitchenHelpers;