import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Specials = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Today's Specials</h1>
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Create Special</CardTitle>
          <CardDescription>Set today's special menu item</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Special title" />
          <Textarea placeholder="Description" />
          <Button>Set as Special</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Specials;