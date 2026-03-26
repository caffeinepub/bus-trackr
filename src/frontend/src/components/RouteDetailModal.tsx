import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Route, getBusPosition } from "@/data/routes";
import { AlertTriangle, CheckCircle, Clock, MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface RouteDetailModalProps {
  route: Route | null;
  onClose: () => void;
}

export function RouteDetailModal({ route, onClose }: RouteDetailModalProps) {
  if (!route) return null;

  const { currentStopIndex, elapsedMinutes } = getBusPosition(route);
  const isDelayed = route.status === "Delayed";
  const busStarted = elapsedMinutes >= 0;

  const getStopStatus = (index: number) => {
    if (!busStarted) return "upcoming";
    if (index < currentStopIndex) return "arrived";
    if (index === currentStopIndex) return "current";
    return "upcoming";
  };

  return (
    <AnimatePresence>
      {route && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card shadow-elevated"
            data-ocid="route.detail.modal"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between rounded-t-xl px-5 py-4"
              style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
            >
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-white/20 px-2.5 py-1 text-sm font-bold text-white">
                  {route.id}
                </span>
                <div>
                  <div className="font-semibold text-white">{route.name}</div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.78 0.01 240)" }}
                  >
                    {route.stops.length} stops ·{" "}
                    {route.stops[route.stops.length - 1].distance} km
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  style={{
                    backgroundColor: isDelayed
                      ? "oklch(0.63 0.22 27)"
                      : "oklch(0.72 0.185 145)",
                    color: "white",
                    border: "none",
                  }}
                >
                  {isDelayed ? (
                    <AlertTriangle className="mr-1 h-3 w-3" />
                  ) : (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {route.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={onClose}
                  data-ocid="route.detail.close_button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stop list */}
            <div className="max-h-[60vh] overflow-y-auto p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Stop-by-Stop Tracking
                </h3>
                {busStarted ? (
                  <p className="text-xs text-muted-foreground">
                    Based on first departure at {route.departures[0]}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    First departure at {route.departures[0]}
                  </p>
                )}
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[17px] top-0 bottom-0 w-0.5"
                  style={{ backgroundColor: "oklch(0.90 0.005 240)" }}
                />

                <div className="space-y-0">
                  {route.stops.map((stop, index) => {
                    const status = getStopStatus(index);
                    const isFirst = index === 0;
                    const isLast = index === route.stops.length - 1;

                    return (
                      <motion.div
                        key={stop.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative flex items-start gap-3 pb-5"
                      >
                        {/* Dot */}
                        <div className="relative z-10 mt-0.5 shrink-0">
                          {status === "current" ? (
                            <div
                              className="h-9 w-9 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: "oklch(0.72 0.185 145)",
                                boxShadow:
                                  "0 0 0 4px oklch(0.72 0.185 145 / 0.2)",
                              }}
                            >
                              <div className="h-2.5 w-2.5 rounded-full bg-white" />
                            </div>
                          ) : status === "arrived" ? (
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: "oklch(0.72 0.185 145 / 0.15)",
                              }}
                            >
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                  backgroundColor: "oklch(0.72 0.185 145)",
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center">
                              <div
                                className="h-3.5 w-3.5 rounded-full border-2"
                                style={{
                                  borderColor:
                                    isDelayed && index > currentStopIndex
                                      ? "oklch(0.63 0.22 27)"
                                      : "oklch(0.85 0.005 240)",
                                  backgroundColor: "white",
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 pt-1.5">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm font-medium ${
                                status === "current"
                                  ? "text-foreground"
                                  : status === "arrived"
                                    ? "text-muted-foreground line-through"
                                    : isDelayed && index > currentStopIndex
                                      ? "text-destructive"
                                      : "text-foreground"
                              }`}
                              style={
                                status === "current"
                                  ? {
                                      color: "oklch(0.22 0.055 243)",
                                      fontWeight: 600,
                                    }
                                  : {}
                              }
                            >
                              {stop.name}
                              {isFirst && " (Origin)"}
                              {isLast && " (Destination)"}
                            </span>
                            <span
                              className={`ml-2 text-xs font-semibold ${
                                status === "arrived"
                                  ? "text-muted-foreground"
                                  : status === "current"
                                    ? ""
                                    : "text-muted-foreground"
                              }`}
                              style={
                                status === "current"
                                  ? { color: "oklch(0.72 0.185 145)" }
                                  : {}
                              }
                            >
                              {stop.time}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {stop.distance} km from origin
                            {status === "current" && (
                              <span
                                className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white"
                                style={{
                                  backgroundColor: "oklch(0.72 0.185 145)",
                                }}
                              >
                                ● Current
                              </span>
                            )}
                            {status === "arrived" && (
                              <span className="ml-2 text-[10px] text-muted-foreground">
                                Passed
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  <Clock className="mr-1 inline h-3 w-3" />
                  Departures: {route.departures.join(" · ")}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  data-ocid="route.detail.cancel_button"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
