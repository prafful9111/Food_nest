import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import Chai from "@/assets/chai.png";
import VadaPav from "@/assets/vadapav.png";
import Poha from "@/assets/poha.png";
import Water from "@/assets/water.png";

const foodItems = [
  { id: 1, name: "Poha", price: 20, category: "Snacks", available: true, image: Poha },
  { id: 2, name: "Vada Pav", price: 30, category: "Snacks", available: true, image: VadaPav },
  { id: 3, name: "Tea", price: 7.99, category: "Beverages", available: false, image: Chai },
  { id: 4, name: "Water Bottle", price: 6.99, category: "Beverages", available: true, image: Water },
];

const FoodItems = () => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">Food Items</h1>
          <p className="text-muted-foreground">Manage menu items and pricing</p>
        </div>
        <Button
          onClick={() => setIsAddingItem(!isAddingItem)}
          className="hover:bg-primary-hover bg-gradient-primary"
        >
          <Plus className="mr-2 w-4 h-4" />
          Add Food Item
        </Button>
      </div>

      {isAddingItem && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Add New Food Item</CardTitle>
            <CardDescription>Create a new menu item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Food Name</Label>

                <Input id="name" placeholder="Enter food name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (฿)</Label>
                <Input id="price" type="number" placeholder="0.00" />
              </div>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Burger, Mexican" />
              </div>
              {/* ✅ New Tax/VAT Input */}
              <div className="space-y-2">
                <Label htmlFor="tax">Tax / VAT (%)</Label>
                <Input id="tax" type="number" placeholder="e.g., 5" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="available" />
                <Label htmlFor="available">Available</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Food Image</Label>
              <div className="p-8 border-2 border-border border-dashed rounded-lg text-center">
                <Upload className="mx-auto mb-2 w-8 h-8 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Click to upload or drag and drop</p>
                <p className="text-muted-foreground text-xs">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setIsAddingItem(false)}>Save Item</Button>
              <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
        {foodItems.map((item) => (
          <Card key={item.id} className="bg-gradient-card shadow-card hover:shadow-warm transition-shadow">
            <CardHeader className="pb-2">
              <div className="bg-muted mb-2 rounded-lg aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </div>
                <Badge
                  variant={item.available ? "default" : "secondary"}
                  className={item.available ? "bg-success" : ""}
                >
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary text-2xl">
                  ฿{item.price}
                  <span className="ml-2 text-muted-foreground text-sm">
                    INR {(item.price * 2.5).toFixed(0)} {/* Calculate INR */}
                  </span>
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
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

export default FoodItems;