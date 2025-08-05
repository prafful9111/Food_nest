import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, LogOut } from "lucide-react";

interface ShiftManagerProps {
  userRole: string;
  shiftStart?: string;
  shiftEnd?: string;
  isShiftActive?: boolean;
  onShiftEnd?: (reason?: string) => void;
}

const ShiftManager = ({ 
  userRole, 
  shiftStart = "09:00 AM", 
  shiftEnd = "06:00 PM", 
  isShiftActive = true,
  onShiftEnd 
}: ShiftManagerProps) => {
  const [isEndShiftOpen, setIsEndShiftOpen] = useState(false);
  const [endReason, setEndReason] = useState("");

  const handleEndShift = () => {
    onShiftEnd?.(endReason);
    setIsEndShiftOpen(false);
    setEndReason("");
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        <span className="text-muted-foreground">Shift:</span>
        <span>{shiftStart} - {shiftEnd}</span>
      </div>
      
      <Badge 
        variant={isShiftActive ? "default" : "secondary"}
        className={isShiftActive ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500"}
      >
        {isShiftActive ? "🟢 Active" : "🟡 Ended Early"}
      </Badge>

      {isShiftActive && (
        <Dialog open={isEndShiftOpen} onOpenChange={setIsEndShiftOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-1" />
              End Shift
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>End Shift Early</DialogTitle>
              <DialogDescription>
                Are you sure you want to end your shift early? Current time: {getCurrentTime()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason (Optional)</Label>
                <Textarea
                  id="reason"
                  value={endReason}
                  onChange={(e) => setEndReason(e.target.value)}
                  placeholder="Enter reason for ending shift early..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEndShift} variant="destructive">
                  Confirm End Shift
                </Button>
                <Button variant="outline" onClick={() => setIsEndShiftOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShiftManager;