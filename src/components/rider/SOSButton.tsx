import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SOSButton = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendSOS = async () => {
    if (!emergencyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter an emergency message",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate sending SOS to supervisors, cooks, and super admin
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setEmergencyMessage("");
      
      toast({
        title: "SOS Sent Successfully",
        description: "Emergency alert has been sent to SuperAdmin, Supervisor, and Cook",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="lg"
          className="bg-red-600 hover:bg-red-700 font-bold text-white animate-pulse"
        >
          <AlertTriangle className="mr-2 w-5 h-5" />
          SOS EMERGENCY
        </Button>
      </DialogTrigger>
      <DialogContent className="border-destructive sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Emergency SOS Alert
          </DialogTitle>
          <DialogDescription>
            This will immediately notify the SuperAdmin, Supervisor, and Cook about your emergency. 
            Please describe your situation clearly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="emergency-message" className="font-medium text-sm">
              Emergency Details *
            </Label>
            <Textarea
              id="emergency-message"
              placeholder="Describe your emergency situation (e.g., vehicle breakdown, medical emergency, safety concern, etc.)"
              value={emergencyMessage}
              onChange={(e) => setEmergencyMessage(e.target.value)}
              className="mt-2 min-h-24"
              maxLength={500}
            />
            <p className="mt-1 text-muted-foreground text-xs">
              {emergencyMessage.length}/500 characters
            </p>
          </div>

          <div className="bg-destructive/10 p-3 border border-destructive/20 rounded-lg">
            <h4 className="mb-1 font-medium text-sm">Who will be notified:</h4>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• SuperAdmin - For immediate executive response</li>
              <li>• Supervisor - For field coordination and support</li>
              <li>• Cook - For inventory and kitchen coordination</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleSendSOS}
              disabled={isLoading || !emergencyMessage.trim()}
              className="flex-1"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 w-4 h-4" />
                  Send SOS Alert
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SOSButton;