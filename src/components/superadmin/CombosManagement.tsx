import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Combine, Edit, Trash2 } from "lucide-react";

const foodItems = [
  { id: 1, name: "Poha", price: 3.99 },
  { id: 2, name: "Vada Pav", price: 2.50 },
  { id: 3, name: "Chai", price: 1.50 },
  { id: 4, name: "Water Bottle", price: 1.00 },
];

const combos = [
  {
    id: 1,
    name: "Morning Special",
    items: ["Poha", "Chai"],
    price: 4.99,
    savings: 0.50,
    status: "Active"
  },
  {
    id: 2,
    name: "Street Food Combo",
    items: ["Vada Pav", "Chai"],
    price: 3.50,
    savings: 0.50,
    status: "Active"
  },
  {
    id: 3,
    name: "Full Meal",
    items: ["Poha", "Vada Pav", "Chai", "Water Bottle"],
    price: 7.99,
    savings: 1.00,
    status: "Inactive"
  },
];

const CombosManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comboName, setComboName] = useState("");
  const [comboPrice, setComboPrice] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleItemToggle = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getSelectedItemsTotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = foodItems.find(f => f.id === itemId);
      return total + (item?.price || 0);
    }, 0);
  };

  const getSavings = () => {
    const total = getSelectedItemsTotal();
    const comboValue = parseFloat(comboPrice) || 0;
    return Math.max(0, total - comboValue);
  };

  const handleCreateCombo = () => {
    // Create combo logic here
    setIsOpen(false);
    setComboName("");
    setComboPrice("");
    setSelectedItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Combos Management</h1>
          <p className="text-muted-foreground">Create and manage food combos with special pricing</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="hover:bg-primary-hover bg-gradient-primary">
              <Plus className="mr-2 w-4 h-4" />
              Create Combo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Combo</DialogTitle>
              <DialogDescription>
                Select multiple food items and set a combo price
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comboName">Combo Name</Label>
                <Input
                  id="comboName"
                  value={comboName}
                  onChange={(e) => setComboName(e.target.value)}
                  placeholder="Enter combo name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Food Items</Label>
                <div className="space-y-2">
                  {foodItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemToggle(item.id)}
                      />
                      <Label htmlFor={`item-${item.id}`} className="flex-1">
                        {item.name} - ฿{item.price}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedItems.length > 0 && (
                  <div className="bg-muted p-2 rounded-lg text-sm">
                    <p>Selected items total: ฿{getSelectedItemsTotal().toFixed(2)}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="comboPrice">Combo Price (฿)</Label>
                <Input
                  id="comboPrice"
                  type="number"
                  step="0.01"
                  value={comboPrice}
                  onChange={(e) => setComboPrice(e.target.value)}
                  placeholder="0.00"
                />
                {comboPrice && selectedItems.length > 0 && (
                  <div className="bg-success/10 p-2 rounded-lg text-sm">
                    <p className="text-success">Customer saves: ฿{getSavings().toFixed(2)}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleCreateCombo} 
                  disabled={!comboName || selectedItems.length < 2 || !comboPrice}
                >
                  Create Combo
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Combine className="w-5 h-5" />
            Existing Combos
          </CardTitle>
          <CardDescription>Manage your food combos and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Combo Name</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Savings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combos.map((combo) => (
                <TableRow key={combo.id}>
                  <TableCell className="font-medium">{combo.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {combo.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">฿{combo.price}</TableCell>
                  <TableCell className="text-success">฿{combo.savings}</TableCell>
                  <TableCell>
                    <Badge variant={combo.status === "Active" ? "default" : "secondary"}>
                      {combo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CombosManagement;