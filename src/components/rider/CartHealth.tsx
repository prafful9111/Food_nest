import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlugZap, Power, BatteryCharging, Battery, Activity, Timer, MapPin } from "lucide-react";

type LogItem = {
  id: string;
  time: string; // ISO string or readable
  action: "start_charging" | "stop_charging" | "note";
  note?: string;
};

const CartHealth = () => {
  // --- Mocked base data (could be fetched) ---
  const [cartId] = useState("CART-TH-1081");
  const [location] = useState("Depot A · Bay 3");
  const [batteryPct, setBatteryPct] = useState(42); // %
  const [isCharging, setIsCharging] = useState(false);
  const [chargeRatePctPerHr] = useState(25); // 25% per hour (demo)
  const [rangePerPctKm] = useState(1.1); // 1% ≈ 1.1 km (demo)
  const [logs, setLogs] = useState<LogItem[]>([
    { id: crypto.randomUUID(), time: new Date().toLocaleString(), action: "note", note: "Pre-shift check completed." },
  ]);

  // Optional: small live tick to simulate battery going up while charging (demo-only)
  useEffect(() => {
    if (!isCharging) return;
    const id = setInterval(() => {
      setBatteryPct(prev => Math.min(100, prev + 1)); // +1% per tick
    }, 4000); // every 4s (demo)
    return () => clearInterval(id);
  }, [isCharging]);

  const rangeKm = useMemo(() => Math.round(batteryPct * rangePerPctKm), [batteryPct, rangePerPctKm]);

  const etaToFull = useMemo(() => {
    if (!isCharging || batteryPct >= 100) return "—";
    const pctRemaining = 100 - batteryPct;
    const hours = pctRemaining / chargeRatePctPerHr;
    const totalMinutes = Math.ceil(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }, [isCharging, batteryPct, chargeRatePctPerHr]);

  const statusBadge = isCharging ? (
    <Badge className="gap-1 bg-success">
      <BatteryCharging className="w-4 h-4" /> Charging
    </Badge>
  ) : (
    <Badge variant="secondary" className="gap-1">
      <Battery className="w-4 h-4" /> Idle
    </Badge>
  );

  const handleToggleCharging = () => {
    setIsCharging(prev => {
      const next = !prev;
      setLogs(l => [
        { id: crypto.randomUUID(), time: new Date().toLocaleString(), action: next ? "start_charging" : "stop_charging" },
        ...l,
      ]);
      return next;
    });
  };

  // Helpers for demo controls (optional)
  const bumpBattery = (delta: number) => setBatteryPct(p => Math.max(0, Math.min(100, p + delta)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-3xl">Cart Health</h1>
          <p className="text-muted-foreground">Monitor your cart status and toggle charging</p>
        </div>
        <Badge variant="outline" className="text-xs">{cartId}</Badge>
      </div>

      {/* Status + Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <PlugZap className="w-5 h-5" />
                Power & Battery
              </CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4" />
                  {location}
                </span>
                {statusBadge}
              </CardDescription>
            </div>

            <Button
              onClick={handleToggleCharging}
              className={`bg-gradient-primary hover:bg-primary-hover ${isCharging ? "ring-2 ring-success/70" : ""}`}
              aria-pressed={isCharging}
            >
              {isCharging ? (
                <>
                  <Power className="mr-2 w-4 h-4" /> Stop Charging
                </>
              ) : (
                <>
                  <BatteryCharging className="mr-2 w-4 h-4" /> Start Charging
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Battery meter */}
          <div className="gap-6 grid md:grid-cols-3">
            <div className="p-4 border rounded-xl">
              <p className="text-muted-foreground text-sm">Battery</p>
              <div className="flex items-end gap-3 mt-2">
                <span className="font-extrabold text-4xl leading-none">{batteryPct}%</span>
                <span className="text-muted-foreground">SoC</span>
              </div>
              <div className="bg-muted mt-4 rounded-full w-full h-2">
                <div
                  className="bg-gradient-primary rounded-full h-2 transition-all"
                  style={{ width: `${batteryPct}%` }}
                />
              </div>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-muted-foreground text-sm">Estimated Range</p>
              <div className="flex items-center gap-2 mt-2">
                <Activity className="w-5 h-5" />
                <span className="font-semibold text-2xl">{rangeKm} km</span>
              </div>
              <p className="mt-1 text-muted-foreground text-xs">Approximation based on current SoC</p>
            </div>

            <div className="p-4 border rounded-xl">
              <p className="text-muted-foreground text-sm">ETA to Full</p>
              <div className="flex items-center gap-2 mt-2">
                <Timer className="w-5 h-5" />
                <span className="font-semibold text-2xl">{etaToFull}</span>
              </div>
              <p className="mt-1 text-muted-foreground text-xs">
                Charge rate ~{chargeRatePctPerHr}% / hr
              </p>
            </div>
          </div>

          {/* Quick Notes */}
          <div className="gap-4 grid md:grid-cols-2 mt-6">
            <Card className="shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Add a quick note</CardTitle>
                <CardDescription>Optional — visible in activity log</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Label htmlFor="note" className="text-sm">Note</Label>
                <Input
                  id="note"
                  placeholder="e.g., Plugged into Bay 3, cable secure"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value?.trim();
                      if (!val) return;
                      setLogs(l => [{ id: crypto.randomUUID(), time: new Date().toLocaleString(), action: "note", note: val }, ...l]);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <p className="text-muted-foreground text-xs">Press Enter to save note</p>
              </CardContent>
            </Card>

            {/* Demo controls (optional) */}
            <Card className="shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Demo Controls</CardTitle>
                <CardDescription>For testing in UI only</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => bumpBattery(+5)}>+5% Battery</Button>
                <Button variant="outline" onClick={() => bumpBattery(-5)}>-5% Battery</Button>
                <Button variant="outline" onClick={() => setBatteryPct(100)}>Set 100%</Button>
                <Button variant="outline" onClick={() => setBatteryPct(10)}>Set 10%</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Charging actions & notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg divide-y">
            {logs.length === 0 ? (
              <div className="p-4 text-muted-foreground text-sm text-center">No activity yet.</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex justify-between items-start gap-4 p-4">
                  <div className="flex items-start gap-3">
                    {log.action === "start_charging" && (
                      <Badge className="gap-1 bg-success/90"><BatteryCharging className="w-3.5 h-3.5" /> Started charging</Badge>
                    )}
                    {log.action === "stop_charging" && (
                      <Badge variant="secondary" className="gap-1"><Power className="w-3.5 h-3.5" /> Stopped charging</Badge>
                    )}
                    {log.action === "note" && (
                      <Badge variant="outline" className="gap-1"><Activity className="w-3.5 h-3.5" /> Note</Badge>
                    )}
                    <span className="text-sm">{log.note}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{log.time}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartHealth;
