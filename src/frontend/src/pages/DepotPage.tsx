import { BottomNav } from "@/components/BottomNav";
import { getDepotById, getRoutesForDepot } from "@/data/depots";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bus,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export function DepotPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const depot = getDepotById(id ?? "");
  const routes = getRoutesForDepot(id ?? "");
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!depot) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0B1520" }}
      >
        <div className="text-center">
          <p className="text-white text-lg font-semibold">Depot not found</p>
          <button
            type="button"
            onClick={() => navigate({ to: "/stops" })}
            className="mt-4 text-sm"
            style={{ color: "#F28A2A" }}
          >
            ← Back to Depots
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: "linear-gradient(180deg, #0B1520 0%, #0F2433 100%)",
      }}
    >
      <header
        className="flex items-center gap-3 px-4 py-4 sticky top-0 z-40"
        style={{
          background: "rgba(11,21,32,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #24384A",
        }}
      >
        <button
          type="button"
          data-ocid="depot.back.button"
          onClick={() => navigate({ to: "/stops" })}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "#152635" }}
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-white text-lg leading-tight truncate">
            {depot.name} Depot
          </h1>
          <p className="text-xs" style={{ color: "#A9B6C3" }}>
            {depot.buses} Buses · {depot.routes} Routes
          </p>
        </div>
      </header>

      <div
        className="mx-4 mt-4 rounded-2xl p-4 flex gap-4"
        style={{ background: "#152635", border: "1px solid #24384A" }}
      >
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold" style={{ color: "#F28A2A" }}>
            {depot.buses}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#A9B6C3" }}>
            Total Buses
          </div>
        </div>
        <div className="w-px" style={{ background: "#24384A" }} />
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold" style={{ color: "#2A8CFF" }}>
            {depot.routes}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#A9B6C3" }}>
            Active Routes
          </div>
        </div>
        <div className="w-px" style={{ background: "#24384A" }} />
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-white">{routes.length}</div>
          <div className="text-xs mt-0.5" style={{ color: "#A9B6C3" }}>
            Timetables
          </div>
        </div>
      </div>

      <main className="px-4 pt-4">
        <h2 className="font-semibold text-white mb-3">Bus Timetable</h2>
        <div className="space-y-3" data-ocid="depot.table">
          {routes.map((route, i) => (
            <div
              key={route.id}
              data-ocid={`depot.item.${i + 1}`}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#152635", border: "1px solid #24384A" }}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4"
                onClick={() =>
                  setExpanded(expanded === route.id ? null : route.id)
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs"
                    style={{
                      background: "rgba(242,138,42,0.15)",
                      color: "#F28A2A",
                    }}
                  >
                    {route.number.replace("HR-", "")}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {route.origin} → {route.destination}
                    </p>
                    <p className="text-xs" style={{ color: "#A9B6C3" }}>
                      {route.number} · {route.stops.length} stops ·{" "}
                      {route.durationMinutes} min
                    </p>
                  </div>
                </div>
                {expanded === route.id ? (
                  <ChevronUp
                    size={16}
                    style={{ color: "#A9B6C3" }}
                    className="shrink-0 ml-2"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    style={{ color: "#A9B6C3" }}
                    className="shrink-0 ml-2"
                  />
                )}
              </button>

              {expanded === route.id && (
                <div style={{ borderTop: "1px solid #24384A" }}>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} style={{ color: "#2A8CFF" }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#2A8CFF" }}
                      >
                        Departure Times
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {route.departures.map((dep) => {
                        const now = new Date();
                        const nowMin = now.getHours() * 60 + now.getMinutes();
                        const [h, m] = dep.split(":").map(Number);
                        const depMin = h * 60 + m;
                        const isPast = depMin < nowMin;
                        return (
                          <span
                            key={dep}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              background: isPast
                                ? "#1a2a3a"
                                : "rgba(42,140,255,0.15)",
                              color: isPast ? "#4a6a8a" : "#2A8CFF",
                              border: `1px solid ${isPast ? "#24384A" : "rgba(42,140,255,0.3)"}`,
                            }}
                          >
                            {dep}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={14} style={{ color: "#F28A2A" }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#F28A2A" }}
                      >
                        Stops
                      </span>
                    </div>
                    <div>
                      {route.stops.map((stopName, si) => (
                        <div
                          key={stopName}
                          className="flex items-start gap-3 mb-2"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                background:
                                  si === 0 || si === route.stops.length - 1
                                    ? "#F28A2A"
                                    : "#24384A",
                                border: "2px solid #F28A2A",
                              }}
                            />
                            {si < route.stops.length - 1 && (
                              <div
                                className="w-0.5 h-4"
                                style={{ background: "#24384A" }}
                              />
                            )}
                          </div>
                          <span
                            className="text-xs pb-1"
                            style={{
                              color:
                                si === 0 || si === route.stops.length - 1
                                  ? "#F2F6FA"
                                  : "#A9B6C3",
                            }}
                          >
                            {stopName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      data-ocid={`depot.reminder.button.${i + 1}`}
                      onClick={() => navigate({ to: "/reminders" })}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{
                        background: "rgba(242,138,42,0.15)",
                        color: "#F28A2A",
                        border: "1px solid rgba(242,138,42,0.3)",
                      }}
                    >
                      🔔 Set Reminder for this Route
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <div
        className="flex items-center gap-2 mx-4 mt-4 p-3 rounded-xl"
        style={{
          background: "rgba(42,140,255,0.1)",
          border: "1px solid rgba(42,140,255,0.2)",
        }}
      >
        <Bus size={14} style={{ color: "#2A8CFF" }} />
        <p className="text-xs" style={{ color: "#A9B6C3" }}>
          Times shown are scheduled. Actual times may vary by 5–15 minutes.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
