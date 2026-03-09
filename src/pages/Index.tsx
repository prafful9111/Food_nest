import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, authApi } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { ChefHat, Loader2, UtensilsCrossed, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  // We need the lazy query version to fetch imperatively after login
  const [getMe, { isLoading: isProfileLoading }] = authApi.endpoints.getMe.useLazyQuery(); // Import authApi at the top

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userPayload = await login({ email, password }).unwrap();
      const token = userPayload.access_token;

      // Optimistically set token so the getMe request is authenticated via RTK Middleware
      // Note: We need a partial setCredentials or just direct token dispatch if the reducer allows,
      // But Since our slice expects both, let's create a temporary stub, then update it.
      dispatch(setCredentials({
        user: { id: "", name: "", email, role: "", status: "" },
        token
      }));

      const profile = await getMe().unwrap();

      dispatch(setCredentials({ user: profile, token }));
      toast.success("Login successful!");

      const roleStr = profile.role?.toLowerCase() || "";
      if (roleStr.includes("super")) navigate("/superadmin");
      else if (roleStr.includes("cook")) navigate("/cook");
      else if (roleStr.includes("rider")) navigate("/rider");
      else if (roleStr.includes("supervisor")) navigate("/supervisor");
      else if (roleStr.includes("refill")) navigate("/refill-coordinator");
      else navigate("/superadmin"); // fallback

    } catch (err) {
      console.error('Failed to log in', err);
      toast.error("Invalid credentials.");
    }
  };

  const isLoading = isLoginLoading || isProfileLoading;

  return (
    <div className="flex justify-center items-center bg-gradient-card p-6 min-h-screen">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-warm transform transition-transform hover:scale-105">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>
          <h1 className="bg-clip-text bg-gradient-primary mb-2 font-bold text-transparent text-5xl tracking-tight">
            Food-Nest
          </h1>
          <p className="text-muted-foreground text-lg">
            Food Cart Management System
          </p>
        </div>

        <Card className="border-2 border-primary/10 shadow-xl backdrop-blur-sm bg-background/95">
          <CardHeader className="space-y-2 pb-6 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold">Email Account</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@foodnest.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-4 border-primary/20 focus-visible:ring-primary/30"
                  required
                />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 px-4 border-primary/20 focus-visible:ring-primary/30"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold shadow-warm transition-all group" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Secure Login
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t border-border/40 pt-6 mt-2 bg-muted/20">
            <div className="text-center w-full">
              <p className="text-xs text-muted-foreground">
                Protected by FoodNest Security Core
              </p>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
};

export default Index;