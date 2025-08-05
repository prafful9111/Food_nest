import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, DollarSign, AlertTriangle, User } from "lucide-react";

const salesLogs = [
  { id: 1, rider: "John Smith", item: "Classic Burger", quantity: 2, amount: "฿17.98", location: "Central Park", time: "11:30 AM" },
  { id: 2, rider: "Mike Davis", item: "Chicken Tacos", quantity: 3, amount: "฿19.50", location: "Community Center", time: "11:45 AM" },
  { id: 3, rider: "Sarah Johnson", item: "Fish & Chips", quantity: 1, amount: "฿9.99", location: "Marina", time: "12:15 PM" },
  { id: 4, rider: "John Smith", item: "Caesar Salad", quantity: 1, amount: "฿7.99", location: "Business District", time: "12:30 PM" },
  { id: 5, rider: "Mike Davis", item: "Classic Burger", quantity: 4, amount: "฿35.96", location: "Local School", time: "12:45 PM" },
];

const spoilageReports = [
  { id: 1, rider: "Mike Davis", item: "Fish & Chips", quantity: 2, reason: "Exceeded temperature limit", time: "10:30 AM", action: "Disposed" },
  { id: 2, rider: "Sarah Johnson", item: "Caesar Salad", quantity: 1, reason: "Past expiration time", time: "02:15 PM", action: "Disposed" },
  { id: 3, rider: "John Smith", item: "Chicken Tacos", quantity: 1, reason: "Dropped during handling", time: "03:30 PM", action: "Disposed" },
];

const requests = [
  { id: 1, rider: "John Smith", item: "Classic Burger", quantity: 10, reason: "High demand in business district", status: "Pending", time: "1 hour ago" },
  { id: 2, rider: "Mike Davis", item: "Chicken Tacos", quantity: 15, reason: "Running low, lunch rush expected", status: "Approved", time: "2 hours ago" },
  { id: 3, rider: "Sarah Johnson", item: "Fish & Chips", quantity: 8, reason: "Popular item at beach location", status: "Pending", time: "3 hours ago" },
];

const RiderLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Rider Logs</h1>
        <p className="text-muted-foreground">Monitor rider activities, sales, and requests</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <span className="w-4 h-4">฿</span>
            Sales Activity
          </TabsTrigger>
          <TabsTrigger value="spoilage" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Spoilage Reports
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Food Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-4 h-4">฿</span>

                Sales Activity Log
              </CardTitle>
              <CardDescription>Recent sales transactions from all riders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.rider}</TableCell>
                      <TableCell>{log.item}</TableCell>
                      <TableCell>{log.quantity}</TableCell>
                      <TableCell className="font-bold text-success">฿{log.amount}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {log.location}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spoilage">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Food Spoilage Reports
              </CardTitle>
              <CardDescription>Items reported as spoiled or damaged</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spoilageReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.rider}</TableCell>
                      <TableCell>{report.item}</TableCell>
                      <TableCell>{report.quantity}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-destructive text-white">
                          {report.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Food Requests from Riders
              </CardTitle>
              <CardDescription>Requests for additional food items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.rider}</TableCell>
                      <TableCell>{request.item}</TableCell>
                      <TableCell>{request.quantity}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={request.status === "Approved" ? "bg-success text-white" : "bg-warning text-white"}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{request.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiderLogs;