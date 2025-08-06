import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, MapPin } from "lucide-react";

const availableItems = [
  { id: 1, name: "Classic Burger", price: 8.99, remaining: 8 },
  { id: 2, name: "Chicken Tacos", price: 6.50, remaining: 7 },
  { id: 3, name: "Fish & Chips", price: 9.99, remaining: 4 },
  { id: 4, name: "Caesar Salad", price: 7.99, remaining: 5 },
];

const todaysSales = [
  { id: 1, item: "Classic Burger", quantity: 2, amount: 17.98, location: "Central Park", time: "12:30 PM" },
  { id: 2, item: "Chicken Tacos", quantity: 1, amount: 6.50, location: "Business District", time: "12:15 PM" },
  { id: 3, item: "Fish & Chips", quantity: 1, amount: 9.99, location: "City Hall", time: "12:00 PM" },
  { id: 4, item: "Caesar Salad", quantity: 1, amount: 7.99, location: "Central Park", time: "11:45 AM" },
  { id: 5, item: "Classic Burger", quantity: 3, amount: 26.97, location: "Business District", time: "11:30 AM" },
];

const LogSales = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ selectedItem, quantity, location });

    // Reset form
    setSelectedItem("");
    setQuantity("");
    setLocation("");
  };

  const calculateTotal = () => {
    if (!selectedItem || !quantity) return 0;
    const item = availableItems.find(item => item.id.toString() === selectedItem);
    return item ? item.price * parseInt(quantity) : 0;
  };

  const getTodayTotal = () => {
    return todaysSales.reduce((sum, sale) => sum + sale.amount, 0);
  };

  const [paymentOption, setPaymentOption] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Log Purchases</h1>
        <p className="text-muted-foreground">Record your food sales and track daily performance</p>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Sale
            </CardTitle>
            <CardDescription>Record a new food sale</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item">Food Item</Label>
                <Select value={selectedItem} onValueChange={setSelectedItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food item" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableItems.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        <div className="flex justify-between items-center w-full">
                          <span>{item.name}</span>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline">฿{item.price}</Badge>
                            <Badge variant="outline">{item.remaining} left</Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={selectedItem ? availableItems.find(item => item.id.toString() === selectedItem)?.remaining : 100}
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Central Park, Business District"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-option">Payment Option</Label>
                <Select value={paymentOption} onValueChange={setPaymentOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              {selectedItem && quantity && (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-success text-lg">
                      ฿{calculateTotal().toFixed(2)} {/* Baht */}
                      <span className="ml-2 text-muted-foreground text-sm">
                        ₹{(calculateTotal() * 2.5).toFixed(0)} {/* INR */}
                      </span>
                    </span>
                  </div>
                </div>
              )}


              <Button
                type="submit"
                className="hover:bg-primary-hover bg-gradient-primary w-full"
                disabled={!selectedItem || !quantity || !location}
              >
                <span className="w-4 h-4">฿</span>

                Add Purchase 
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Today's Performance</CardTitle>
            <CardDescription>Your sales summary for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="gap-4 grid grid-cols-3 text-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Sales</p>
                  <p className="font-bold text-success text-2xl">
                    ฿{getTodayTotal().toFixed(2)} {/* Baht */}
                    <span className="ml-2 text-muted-foreground text-sm">
                      INR {(getTodayTotal() * 2.5).toFixed(0)} {/* INR */}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Transactions</p>
                  <p className="font-bold text-2xl">{todaysSales.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Avg Sale</p>
                  <p className="font-bold text-2xl">
                    ฿{(getTodayTotal() / todaysSales.length).toFixed(2)} {/* Baht */}
                    <span className="ml-2 text-muted-foreground text-sm">
                      INR {((getTodayTotal() / todaysSales.length) * 2.5).toFixed(0)} {/* INR */}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>All your sales transactions for today</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaysSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.item}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell className="font-bold text-success">
                    ฿{sale.amount.toFixed(2)} {/* Baht */}
                    <span className="ml-2 text-muted-foreground text-sm">
                      INR {(sale.amount * 2.5).toFixed(0)} {/* INR */}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {sale.location}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{sale.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogSales;