import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEPOTS, DEPOT_ROUTES, isRouteActive } from "@/data/depots";
import type { BusRoute } from "@/data/depots";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bus, Clock, MapPin, Radio } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function getNextDeparture(route: BusRoute): string | null {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    if (h * 60 + m > nowMin) return dep;
  }
  return null;
}

interface RoutesSectionProps {
  onRouteSelect?: (route: BusRoute) => void;
}

export function RoutesSection({ onRouteSelect }: RoutesSectionProps) {
  const [activeDistrict, setActiveDistrict] = useState(DEPOTS[0].id);

  const routes = DEPOT_ROUTES[activeDistrict] ?? [];

  return (
    <section
      id="routes"
      className="bg-background py-14"
      data-ocid="routes.section"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Bus Routes — All 22 Districts
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a district to browse routes. Green badge means a bus is
            currently in transit.
          </p>
        </motion.div>

        {/* District filter */}
        <div className="mb-6 flex flex-wrap gap-2" data-ocid="routes.tab">
          {DEPOTS.map((depot) => (
            <button
              key={depot.id}
              type="button"
              onClick={() => setActiveDistrict(depot.id)}
              data-ocid="routes.tab"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                activeDistrict === depot.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {depot.name}
            </button>
          ))}
        </div>

        {/* Route cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {routes.map((route, i) => {
            const active = isRouteActive(route);
            const nextDep = getNextDeparture(route);
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                data-ocid={`routes.item.${i + 1}`}
              >
                <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          {route.number}
                        </span>
                        {active ? (
                          <Badge className="gap-1 bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/20">
                            <Radio size={10} className="animate-pulse" /> Live
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground"
                          >
                            Scheduled
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {route.stops.length} stops
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        <MapPin size={13} className="text-primary shrink-0" />
                        {route.origin}
                      </div>
                      <div className="flex items-center gap-1.5 pl-1 mt-1">
                        <ArrowRight
                          size={12}
                          className="text-muted-foreground ml-0.5"
                        />
                        <span className="text-sm text-muted-foreground">
                          {route.destination}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={11} />
                        {nextDep ? (
                          <span>
                            Next:{" "}
                            <span className="font-semibold text-foreground">
                              {nextDep}
                            </span>
                          </span>
                        ) : (
                          <span>No more buses today</span>
                        )}
                      </div>
                      <Link
                        to="/track"
                        search={{ routeId: route.id }}
                        data-ocid={`routes.track.button.${i + 1}`}
                        className="flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        onClick={() => onRouteSelect?.(route)}
                      >
                        <Bus size={11} /> Track
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {routes.length === 0 && (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="routes.empty_state"
          >
            No routes found for this district.
          </div>
        )}
      </div>
    </section>
  );
}
