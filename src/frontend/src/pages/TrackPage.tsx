import { BottomNav } from "@/components/BottomNav";
import { getActiveRoutes, getAllRoutes, isRouteActive } from "@/data/depots";
import type { BusRoute } from "@/data/depots";
import { useSearch } from "@tanstack/react-router";
import {
  Bus,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatMinutes(totalMin: number): string {
  const h = Math.floor((totalMin % (24 * 60)) / 60);
  const m = totalMin % 60;
  const suffix = h < 12 ? "AM" : "PM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(m).padStart(2, "0")} ${suffix}`;
}

function getNextDeparture(route: BusRoute): string | null {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    if (h * 60 + m > nowMin) return dep;
  }
  return null;
}

function getActiveDeparture(route: BusRoute): string | null {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    const depMin = h * 60 + m;
    if (nowMin >= depMin && nowMin < depMin + route.durationMinutes) {
      return dep;
    }
  }
  return null;
}

/** Always returns a departure string — never null (unless departures array is empty) */
function getEffectiveDeparture(route: BusRoute): string | null {
  if (route.departures.length === 0) return null;
  return (
    getActiveDeparture(route) ??
    getNextDeparture(route) ??
    route.departures[route.departures.length - 1] ??
    route.departures[0]
  );
}

function getStopTimes(route: BusRoute, departureStr: string): string[] {
  const [h, m] = departureStr.split(":").map(Number);
  const startMin = h * 60 + m;
  const n = route.stops.length;
  return route.stops.map((_, i) => {
    const fraction = n > 1 ? i / (n - 1) : 0;
    const stopMin = Math.round(startMin + fraction * route.durationMinutes);
    return formatMinutes(stopMin);
  });
}

function getCurrentStopForRoute(route: BusRoute): {
  stopIndex: number;
  progressPct: number;
} {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let activeDepMin = -1;
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    const depMin = h * 60 + m;
    if (nowMin >= depMin && nowMin < depMin + route.durationMinutes) {
      activeDepMin = depMin;
      break;
    }
  }

  if (activeDepMin < 0) return { stopIndex: 0, progressPct: 0 };

  const elapsed = nowMin - activeDepMin;
  const progressPct = Math.min((elapsed / route.durationMinutes) * 100, 100);
  const stopIndex = Math.floor(
    (elapsed / route.durationMinutes) * (route.stops.length - 1),
  );
  return { stopIndex, progressPct };
}

function StopList({ route }: { route: BusRoute }) {
  const active = isRouteActive(route);
  const { stopIndex } = getCurrentStopForRoute(route);
  const depStr = getEffectiveDeparture(route);
  const stopTimes = depStr ? getStopTimes(route, depStr) : [];

  return (
    <div className="mt-3">
      {route.stops.map((stop, i) => {
        const isStart = i === 0;
        const isEnd = i === route.stops.length - 1;
        const isCurrent = active && i === stopIndex;
        const isPassed = active && i < stopIndex;
        const isUpcoming = !isPassed && !isCurrent;

        let dotColor = "#24384A";
        let dotBorder = "1.5px solid #3A5068";
        let dotShadow = "none";
        if (isStart && !active) dotColor = "#22c55e";
        else if (isPassed) dotColor = "#F28A2A";
        else if (isCurrent) {
          dotColor = "#F28A2A";
          dotBorder = "2px solid #F2F6FA";
          dotShadow = "0 0 0 4px rgba(242,138,42,0.25)";
        } else if (isEnd) dotColor = "#F28A2A";
        else if (isStart) dotColor = "#22c55e";

        let timeColor = "#A9B6C3";
        if (isStart) timeColor = "#22c55e";
        else if (isCurrent) timeColor = "#F28A2A";
        else if (isEnd) timeColor = "#F28A2A";
        else if (isPassed) timeColor = "#6B8FA6";
        else if (isUpcoming) timeColor = "#2A8CFF";

        return (
          <div
            key={stop}
            className="flex items-start gap-3"
            style={{ opacity: isPassed && !isStart ? 0.55 : 1 }}
          >
            {/* Timeline column */}
            <div
              className="flex flex-col items-center"
              style={{ width: 16, minWidth: 16 }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: dotColor,
                  border: dotBorder,
                  boxShadow: dotShadow,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              {i < route.stops.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 22,
                    background: isPassed ? "#F28A2A" : "#24384A",
                    margin: "2px 0",
                  }}
                />
              )}
            </div>

            {/* Stop info */}
            <div className="flex-1 pb-3 flex items-start justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-sm"
                  style={{
                    color: isPassed ? "#6B8FA6" : "#F2F6FA",
                    fontWeight: isCurrent || isStart || isEnd ? 600 : 400,
                  }}
                >
                  {stop}
                </span>
                {isStart && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      color: "#22c55e",
                    }}
                  >
                    Start
                  </span>
                )}
                {isEnd && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: "rgba(242,138,42,0.15)",
                      color: "#F28A2A",
                    }}
                  >
                    End
                  </span>
                )}
                {isCurrent && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: "rgba(242,138,42,0.2)",
                      color: "#F28A2A",
                    }}
                  >
                    🚌 NOW
                  </span>
                )}
              </div>
              {stopTimes[i] && (
                <span
                  className="text-xs font-mono ml-2 shrink-0"
                  style={{
                    color: timeColor,
                    fontWeight: isCurrent || isStart || isEnd ? 600 : 400,
                  }}
                >
                  {stopTimes[i]}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RouteTimeline({ route }: { route: BusRoute }) {
  const active = isRouteActive(route);
  const { stopIndex, progressPct } = getCurrentStopForRoute(route);
  const [expanded, setExpanded] = useState(false);
  const width = 340;
  const padding = 20;
  const lineWidth = width - padding * 2;
  const stopSpacing = lineWidth / Math.max(route.stops.length - 1, 1);

  const nextDep = getNextDeparture(route);
  const activeDep = getActiveDeparture(route);

  // Always compute stop times using effective departure
  const effectiveDep = getEffectiveDeparture(route);
  const stopTimes = effectiveDep ? getStopTimes(route, effectiveDep) : [];
  const depTime = stopTimes[0] ?? null;
  const arrTime = stopTimes[stopTimes.length - 1] ?? null;

  return (
    <div
      className="rounded-2xl p-4 mb-3"
      style={{ background: "#152635", border: "1px solid #24384A" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(242,138,42,0.2)", color: "#F28A2A" }}
          >
            {route.number}
          </div>
          <span className="text-white font-semibold text-sm">
            {route.origin.split(" ")[0]} → {route.destination.split(" ")[0]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {active ? (
            <>
              <div
                className="w-2 h-2 rounded-full pulse-dot"
                style={{ background: "#22c55e" }}
              />
              <span className="text-xs" style={{ color: "#22c55e" }}>
                Live
              </span>
            </>
          ) : (
            <span className="text-xs" style={{ color: "#A9B6C3" }}>
              Scheduled
            </span>
          )}
        </div>
      </div>

      {/* Departure & Arrival time row — always visible */}
      {(depTime || arrTime) && (
        <div className="flex items-center gap-4 mb-3">
          {depTime && (
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: "#22c55e" }}>
                🟢
              </span>
              <span className="text-xs" style={{ color: "#A9B6C3" }}>
                Dep:
              </span>
              <span
                className="text-xs font-semibold font-mono"
                style={{ color: "#22c55e" }}
              >
                {depTime}
              </span>
            </div>
          )}
          {arrTime && depTime !== arrTime && (
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: "#F28A2A" }}>
                🟠
              </span>
              <span className="text-xs" style={{ color: "#A9B6C3" }}>
                Arr:
              </span>
              <span
                className="text-xs font-semibold font-mono"
                style={{ color: "#F28A2A" }}
              >
                {arrTime}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <svg
          width={width}
          height="80"
          viewBox={`0 0 ${width} 80`}
          role="img"
          aria-label={`Route ${route.number} progress`}
        >
          <title>{route.number} live progress</title>
          <rect
            x={padding}
            y="35"
            width={lineWidth}
            height="4"
            rx="2"
            fill="#24384A"
          />
          <rect
            x={padding}
            y="35"
            width={active ? (progressPct / 100) * lineWidth : 0}
            height="4"
            rx="2"
            fill="#F28A2A"
          />
          {route.stops.map((stop, i) => {
            const cx = padding + i * stopSpacing;
            const isPassed = active && i <= stopIndex;
            const isCurrent = active && i === stopIndex;
            return (
              <g key={stop}>
                {isCurrent && (
                  <circle
                    cx={cx}
                    cy="37"
                    r="14"
                    fill="rgba(242,138,42,0.2)"
                    className="pulse-dot"
                  />
                )}
                <circle
                  cx={cx}
                  cy="37"
                  r={isCurrent ? 8 : 5}
                  fill={isPassed ? "#F28A2A" : "#24384A"}
                  stroke={isCurrent ? "#F2F6FA" : "none"}
                  strokeWidth={isCurrent ? 2 : 0}
                />
                <text
                  x={cx}
                  y={i % 2 === 0 ? "22" : "68"}
                  textAnchor="middle"
                  fill={isPassed ? "#F2F6FA" : "#A9B6C3"}
                  fontSize="7"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {stop.split(" ")[0]}
                </text>
              </g>
            );
          })}
          {active && (
            <text
              x={padding + (progressPct / 100) * lineWidth}
              y="58"
              textAnchor="middle"
              fontSize="14"
            >
              🚌
            </text>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1">
          <MapPin size={12} style={{ color: "#A9B6C3" }} />
          <span className="text-xs" style={{ color: "#A9B6C3" }}>
            {active ? (
              <>
                At:{" "}
                <span className="text-white">
                  {route.stops[stopIndex] ?? route.stops[0]}
                </span>
              </>
            ) : (
              <>
                Next dep:{" "}
                <span style={{ color: "#2A8CFF" }}>{nextDep ?? "—"}</span>
              </>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {active && (
            <div className="flex items-center gap-1">
              <Clock size={12} style={{ color: "#A9B6C3" }} />
              <span className="text-xs" style={{ color: "#A9B6C3" }}>
                Next:{" "}
                <span style={{ color: "#2A8CFF" }}>
                  {route.stops[
                    Math.min(stopIndex + 1, route.stops.length - 1)
                  ]?.split(" ")[0] ?? "Last Stop"}
                </span>
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
            style={{
              background: expanded
                ? "rgba(42,140,255,0.18)"
                : "rgba(36,56,74,0.8)",
              color: expanded ? "#2A8CFF" : "#A9B6C3",
              border: expanded
                ? "1px solid rgba(42,140,255,0.35)"
                : "1px solid #24384A",
            }}
          >
            {expanded ? (
              <>
                Hide stops <ChevronUp size={11} />
              </>
            ) : (
              <>
                Show times <ChevronDown size={11} />
              </>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div>
          <div className="my-3" style={{ height: 1, background: "#24384A" }} />
          <p className="text-xs mb-2" style={{ color: "#A9B6C3" }}>
            {active
              ? `Estimated stop times · Trip started ${activeDep ?? ""}`
              : `Scheduled times · Next departure: ${nextDep ?? effectiveDep ?? "—"}`}
          </p>
          <StopList route={route} />
        </div>
      )}
    </div>
  );
}

export function TrackPage() {
  const [now, setNow] = useState(new Date());
  const [tick, setTick] = useState(0);
  const { routeId } = useSearch({ from: "/track" });

  // Recompute on every tick
  const liveRoutes = getActiveRoutes();
  const selectedRoute = routeId
    ? (getAllRoutes().find((r) => r.id === routeId) ?? null)
    : null;

  const otherLiveRoutes = liveRoutes.filter((r) => r.id !== routeId);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setNow(new Date());
    setTick((t) => t + 1);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: "linear-gradient(180deg, #0B1520 0%, #0F2433 100%)",
      }}
    >
      <header
        className="flex items-center justify-between px-4 py-4 sticky top-0 z-40"
        style={{
          background: "rgba(11,21,32,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #24384A",
        }}
      >
        <div>
          <h1 className="font-bold text-white text-lg">Live Bus Tracker</h1>
          <p className="text-xs" style={{ color: "#A9B6C3" }}>
            {liveRoutes.length} buses in transit · Auto-updates every 30s
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: "#A9B6C3" }}>
            {formatTime(now)}
          </span>
          <button
            type="button"
            data-ocid="track.refresh.button"
            onClick={handleRefresh}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#152635" }}
          >
            <RefreshCw size={16} color="#A9B6C3" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4">
        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#F28A2A" }}
            />
            <span className="text-xs" style={{ color: "#A9B6C3" }}>
              Visited
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#24384A" }}
            />
            <span className="text-xs" style={{ color: "#A9B6C3" }}>
              Upcoming
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#22c55e" }}
            />
            <span className="text-xs" style={{ color: "#A9B6C3" }}>
              Live
            </span>
          </div>
        </div>

        <div key={tick}>
          {/* Selected route shown prominently */}
          {selectedRoute && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    color: "#22c55e",
                  }}
                >
                  Your Route
                </span>
                {(() => {
                  const next = getNextDeparture(selectedRoute);
                  return next ? (
                    <span className="text-xs" style={{ color: "#A9B6C3" }}>
                      Next departure:{" "}
                      <span style={{ color: "#2A8CFF" }}>{next}</span>
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: "#A9B6C3" }}>
                      Last bus departed today
                    </span>
                  );
                })()}
              </div>
              <RouteTimeline route={selectedRoute} />
            </div>
          )}

          {/* Other active buses */}
          {otherLiveRoutes.length > 0 && (
            <>
              {selectedRoute && (
                <h2
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#A9B6C3" }}
                >
                  Other Active Buses ({otherLiveRoutes.length})
                </h2>
              )}
              {!selectedRoute && (
                <h2
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#A9B6C3" }}
                >
                  {liveRoutes.length} Active Buses Right Now
                </h2>
              )}
              {otherLiveRoutes.map((route) => (
                <RouteTimeline key={route.id} route={route} />
              ))}
            </>
          )}

          {liveRoutes.length === 0 && !selectedRoute && (
            <div
              className="rounded-2xl p-6 text-center mb-4"
              style={{ background: "#152635", border: "1px solid #24384A" }}
              data-ocid="track.empty_state"
            >
              <Bus
                size={32}
                style={{ color: "#A9B6C3" }}
                className="mx-auto mb-3"
              />
              <p className="text-white font-semibold mb-1">
                No buses currently in transit
              </p>
              <p className="text-xs" style={{ color: "#A9B6C3" }}>
                Check next departures below or try again in a few minutes.
              </p>
            </div>
          )}

          {/* Show upcoming routes when no live buses */}
          {liveRoutes.length === 0 && !selectedRoute && (
            <div>
              <h2
                className="text-sm font-semibold mb-3"
                style={{ color: "#A9B6C3" }}
              >
                Upcoming Routes
              </h2>
              {getAllRoutes()
                .filter((r) => getNextDeparture(r) !== null)
                .slice(0, 6)
                .map((route) => (
                  <RouteTimeline key={route.id} route={route} />
                ))}
            </div>
          )}
        </div>

        <div
          className="flex items-start gap-2 rounded-xl p-3 mt-2"
          style={{
            background: "rgba(42,140,255,0.08)",
            border: "1px solid rgba(42,140,255,0.2)",
          }}
        >
          <Bus
            size={14}
            style={{ color: "#2A8CFF" }}
            className="mt-0.5 shrink-0"
          />
          <p className="text-xs" style={{ color: "#A9B6C3" }}>
            Bus positions are calculated based on current time and scheduled
            departure times. Positions update every 30 seconds.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
