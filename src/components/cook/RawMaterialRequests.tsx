import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RawMaterialRequests = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Raw Material Requests</h1>
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Request Materials</CardTitle>
          <CardDescription>Request raw materials for cooking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Material name" />
          <Input placeholder="Quantity" />
          <Button>Submit Request</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RawMaterialRequests;