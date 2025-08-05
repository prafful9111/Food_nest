import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Package2 } from "lucide-react";

const menuItems = [
  { id: 1, name: "Poha", status: "Processing", quantity: 20, prepTime: "15 min", assigned: true },
  { id: 2, name: "Vada Pav", status: "Ready", quantity: 15, prepTime: "10 min", assigned: true },
  { id: 3, name: "Chai", status: "Ready", quantity: 30, prepTime: "5 min", assigned: true },
  { id: 4, name: "Water Bottle", status: "Picked", quantity: 25, prepTime: "0 min", assigned: false },
];

const MyMenu = () => {
  const [items, setItems] = useState(menuItems);

  const updateItemStatus = (itemId: number, newStatus: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };

  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-success';
      case 'Processing':
        return 'bg-warning';
      case 'Picked':
        return 'bg-muted';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Menu</h1>
        <p className="text-muted-foreground">Manage your assigned food items and preparation status</p>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package2 className="h-5 w-5" />
                    {item.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Prep time: {item.prepTime}
                    </span>
                    <span>Quantity: {item.quantity}</span>
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`status-${item.id}`}>Status</Label>
                  <Select 
                    value={item.status} 
                    onValueChange={(value) => updateItemStatus(item.id, value)}
                  >
                    <SelectTrigger id={`status-${item.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Ready">Ready</SelectItem>
                      <SelectItem value="Picked">Picked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`quantity-${item.id}`}>Quantity to Prepare</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`prep-time-${item.id}`}>Prep Time Estimate</Label>
                  <Input
                    id={`prep-time-${item.id}`}
                    value={item.prepTime}
                    placeholder="e.g., 15 min"
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyMenu;