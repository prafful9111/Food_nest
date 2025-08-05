import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, UsersRound, User, X, UtensilsCrossed, Car } from "lucide-react";

const supervisors = [
  { id: 1, name: "Alice Johnson", available: true },
  { id: 2, name: "Bob Smith", available: false },
  { id: 3, name: "Carol Davis", available: true },
  { id: 4, name: "David Wilson", available: true },
];

const riders = [
  { id: 1, name: "Mike Rodriguez", available: true },
  { id: 2, name: "Sarah Chen", available: true },
  { id: 3, name: "James Wilson", available: false },
  { id: 4, name: "Emily Davis", available: true },
];

const cooks = [
  { id: 1, name: "Roberto Singh", available: true },
  { id: 2, name: "Maria Garcia", available: true },
  { id: 3, name: "David Kim", available: false },
];

const teams = [
  {
    id: 1,
    name: "Downtown Team",
    supervisors: ["Alice Johnson", "David Wilson"],
    riders: ["Mike Rodriguez", "Sarah Chen"],
    cooks: ["Roberto Singh"],
    created: "2024-01-15",
    routes: 3,
  },
  {
    id: 2,
    name: "Suburban Team", 
    supervisors: ["Carol Davis"],
    riders: ["Emily Davis"],
    cooks: ["Maria Garcia"],
    created: "2024-01-20",
    routes: 2,
  },
];

const TeamManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedSupervisors, setSelectedSupervisors] = useState<string[]>([]);
  const [selectedRiders, setSelectedRiders] = useState<string[]>([]);
  const [selectedCooks, setSelectedCooks] = useState<string[]>([]);

  const handleAddSupervisor = (supervisorName: string) => {
    if (!selectedSupervisors.includes(supervisorName)) {
      setSelectedSupervisors([...selectedSupervisors, supervisorName]);
    }
  };

  const handleRemoveSupervisor = (supervisorName: string) => {
    setSelectedSupervisors(selectedSupervisors.filter(s => s !== supervisorName));
  };

  const handleUserSelection = (userName: string, userType: 'supervisors' | 'riders' | 'cooks', checked: boolean) => {
    if (userType === 'supervisors') {
      setSelectedSupervisors(prev => 
        checked ? [...prev, userName] : prev.filter(s => s !== userName)
      );
    } else if (userType === 'riders') {
      setSelectedRiders(prev => 
        checked ? [...prev, userName] : prev.filter(r => r !== userName)
      );
    } else if (userType === 'cooks') {
      setSelectedCooks(prev => 
        checked ? [...prev, userName] : prev.filter(c => c !== userName)
      );
    }
  };

  const handleCreateTeam = () => {
    // Create team logic here
    setIsOpen(false);
    setTeamName("");
    setSelectedSupervisors([]);
    setSelectedRiders([]);
    setSelectedCooks([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Create and manage teams with supervisors</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Create a team and assign supervisors to manage operations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Select Supervisors
                  </Label>
                  <div className="grid gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                    {supervisors.filter(s => s.available).map((supervisor) => (
                      <div key={supervisor.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`supervisor-${supervisor.id}`}
                          checked={selectedSupervisors.includes(supervisor.name)}
                          onCheckedChange={(checked) => 
                            handleUserSelection(supervisor.name, 'supervisors', checked as boolean)
                          }
                        />
                        <Label htmlFor={`supervisor-${supervisor.id}`} className="text-sm font-normal">
                          {supervisor.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Select Riders
                  </Label>
                  <div className="grid gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                    {riders.filter(r => r.available).map((rider) => (
                      <div key={rider.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rider-${rider.id}`}
                          checked={selectedRiders.includes(rider.name)}
                          onCheckedChange={(checked) => 
                            handleUserSelection(rider.name, 'riders', checked as boolean)
                          }
                        />
                        <Label htmlFor={`rider-${rider.id}`} className="text-sm font-normal">
                          {rider.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4" />
                    Select Cooks
                  </Label>
                  <div className="grid gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                    {cooks.filter(c => c.available).map((cook) => (
                      <div key={cook.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cook-${cook.id}`}
                          checked={selectedCooks.includes(cook.name)}
                          onCheckedChange={(checked) => 
                            handleUserSelection(cook.name, 'cooks', checked as boolean)
                          }
                        />
                        <Label htmlFor={`cook-${cook.id}`} className="text-sm font-normal">
                          {cook.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedSupervisors.length > 0 || selectedRiders.length > 0 || selectedCooks.length > 0) && (
                <div className="space-y-3 border-t pt-4">
                  <Label>Selected Team Members</Label>
                  <div className="space-y-2">
                    {selectedSupervisors.length > 0 && (
                      <div>
                        <Badge variant="outline" className="mb-2">Supervisors</Badge>
                        <div className="flex flex-wrap gap-2">
                          {selectedSupervisors.map((supervisor) => (
                            <Badge key={supervisor} className="bg-blue-100 text-blue-800">
                              {supervisor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedRiders.length > 0 && (
                      <div>
                        <Badge variant="outline" className="mb-2">Riders</Badge>
                        <div className="flex flex-wrap gap-2">
                          {selectedRiders.map((rider) => (
                            <Badge key={rider} className="bg-green-100 text-green-800">
                              {rider}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedCooks.length > 0 && (
                      <div>
                        <Badge variant="outline" className="mb-2">Cooks</Badge>
                        <div className="flex flex-wrap gap-2">
                          {selectedCooks.map((cook) => (
                            <Badge key={cook} className="bg-orange-100 text-orange-800">
                              {cook}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  onClick={handleCreateTeam} 
                  disabled={!teamName || (selectedSupervisors.length === 0 && selectedRiders.length === 0 && selectedCooks.length === 0)}
                >
                  Create Team
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <UsersRound className="h-5 w-5" />
                    {team.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span>Created: {team.created}</span>
                    <span>{team.routes} active routes</span>
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">Edit Team</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.supervisors.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Supervisors ({team.supervisors.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {team.supervisors.map((supervisor, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800">
                          {supervisor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {team.riders && team.riders.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Riders ({team.riders.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {team.riders.map((rider, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800">
                          {rider}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {team.cooks && team.cooks.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4" />
                      Cooks ({team.cooks.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {team.cooks.map((cook, index) => (
                        <Badge key={index} className="bg-orange-100 text-orange-800">
                          {cook}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;