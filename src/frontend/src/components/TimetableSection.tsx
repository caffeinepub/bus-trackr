import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES, type Route } from "@/data/routes";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function TimetableSection() {
  const [selectedId, setSelectedId] = useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === selectedId) ?? ROUTES[0];
  const isDelayed = route.status === "Delayed";

  return (
    <section
      id="timetable"
      className="bg-white py-14"
      data-ocid="timetable.section"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Full Timetable
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete departure schedule and stop times for all routes.
          </p>
        </motion.div>

        {/* Route selector */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger
              className="w-64 border-border bg-card"
              data-ocid="timetable.route.select"
            >
              <SelectValue placeholder="Select a route" />
            </SelectTrigger>
            <SelectContent>
              {ROUTES.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  [{r.id}] {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Badge
            className="flex items-center gap-1 text-xs font-semibold"
            style={{
              backgroundColor: isDelayed
                ? "oklch(0.63 0.22 27)"
                : "oklch(0.72 0.185 145)",
              color: "white",
              border: "none",
            }}
          >
            {isDelayed ? (
              <AlertTriangle className="h-3 w-3" />
            ) : (
              <CheckCircle className="h-3 w-3" />
            )}
            {route.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Stop-by-stop table */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Stop Times — Route {route.id}
            </h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <Table data-ocid="timetable.stops.table">
                <TableHeader>
                  <TableRow
                    style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
                  >
                    <TableHead className="text-xs font-semibold">#</TableHead>
                    <TableHead className="text-xs font-semibold">
                      Stop Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Arrival
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-right">
                      Distance
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.stops.map((stop, i) => (
                    <TableRow key={stop.name} className="hover:bg-accent/50">
                      <TableCell className="text-xs text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {stop.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {stop.time}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {stop.distance} km
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Daily departures table */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Daily Departures from {route.origin}
            </h3>
            <div className="overflow-hidden rounded-lg border border-border">
              <Table data-ocid="timetable.departures.table">
                <TableHeader>
                  <TableRow
                    style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
                  >
                    <TableHead className="text-xs font-semibold">
                      Departure
                    </TableHead>
                    <TableHead className="text-xs font-semibold">
                      Estimated Arrival
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-right">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.departures.map((dep, i) => {
                    const [dh, dm] = dep.split(":").map(Number);
                    const [lh, lm] = route.stops[route.stops.length - 1].time
                      .split(":")
                      .map(Number);
                    const [fh, fm] = route.stops[0].time.split(":").map(Number);
                    const durationMins = lh * 60 + lm - (fh * 60 + fm);
                    const arrivalMins = dh * 60 + dm + durationMins;
                    const ah = Math.floor(arrivalMins / 60) % 24;
                    const am = arrivalMins % 60;
                    const arrival = `${String(ah).padStart(2, "0")}:${String(am).padStart(2, "0")}`;

                    return (
                      <TableRow key={dep} className="hover:bg-accent/50">
                        <TableCell
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.22 0.055 243)" }}
                        >
                          {dep}
                        </TableCell>
                        <TableCell className="text-sm">{arrival}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                            style={{
                              backgroundColor:
                                isDelayed && i === 0
                                  ? "oklch(0.63 0.22 27)"
                                  : "oklch(0.72 0.185 145)",
                            }}
                          >
                            {isDelayed && i === 0 ? "Delayed" : "On Time"}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
