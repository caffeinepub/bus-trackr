import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Route, getNextDeparture } from "@/data/routes";
import { ChevronRight, Clock, MapPin } from "lucide-react";

interface RouteCardProps {
  route: Route;
  index: number;
  onViewDetails: (route: Route) => void;
}

export function RouteCard({ route, index, onViewDetails }: RouteCardProps) {
  const nextDep = getNextDeparture(route.departures);
  const isDelayed = route.status === "Delayed";

  return (
    <Card
      className="overflow-hidden border border-border bg-card shadow-card transition-shadow hover:shadow-elevated"
      data-ocid={`routes.item.${index}`}
    >
      {/* Card header stripe */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "oklch(0.95 0.04 145)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="rounded-md px-2.5 py-1 text-sm font-bold text-white"
            style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
          >
            {route.id}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {route.name}
          </span>
        </div>
        <Badge
          className="text-xs font-semibold"
          style={{
            backgroundColor: isDelayed
              ? "oklch(0.63 0.22 27)"
              : "oklch(0.72 0.185 145)",
            color: "white",
            border: "none",
          }}
        >
          {route.status}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-3 space-y-1.5">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <div>
              <div className="font-medium text-foreground">{route.origin}</div>
              <div className="text-xs text-muted-foreground">
                → {route.destination}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1.5 text-sm">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground text-xs">Next:</span>
          <span
            className="font-semibold"
            style={{ color: "oklch(0.22 0.055 243)" }}
          >
            {nextDep}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {route.stops.length} stops ·{" "}
            {route.stops[route.stops.length - 1].distance} km
          </span>
        </div>

        {/* Mini departure pills */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {route.departures.slice(0, 4).map((dep) => (
            <span
              key={dep}
              className="rounded px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "oklch(0.97 0.005 240)",
                color: "oklch(0.40 0.02 240)",
              }}
            >
              {dep}
            </span>
          ))}
          {route.departures.length > 4 && (
            <span className="rounded px-2 py-0.5 text-xs text-muted-foreground">
              +{route.departures.length - 4} more
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-border text-sm font-medium hover:bg-accent"
          onClick={() => onViewDetails(route)}
          data-ocid={`routes.view_button.${index}`}
        >
          View Details
          <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}
