import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FoodPrepStatus = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Food Prep Status</h1>
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Current Preparation Queue</CardTitle>
          <CardDescription>Track food preparation progress</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Food preparation tracking interface</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodPrepStatus;