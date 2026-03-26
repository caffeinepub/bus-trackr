import { BottomNav } from "@/components/BottomNav";
import {
  DEPOTS,
  getAllStopNames,
  searchConnectingRoutes,
  searchRoutesByStops,
} from "@/data/depots";
import type { BusRoute, ConnectingRoute } from "@/data/depots";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowRight,
  Bus,
  MapPin,
  Navigation,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";

const POPULAR_DEPOTS = DEPOTS.slice(0, 6);
const ALL_STOPS = getAllStopNames();

function getNextDeparture(route: BusRoute): string | null {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    if (h * 60 + m > nowMin) return dep;
  }
  return null;
}

function StopInput({
  value,
  onChange,
  placeholder,
  dataOcid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  dataOcid: string;
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [];
    const q = value.toLowerCase();
    return ALL_STOPS.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [value]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setOpen(false), 150);
  }, []);

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        data-ocid={dataOcid}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-white placeholder:text-[#5A7A90] text-sm py-1"
      />
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden"
            style={{
              background: "#1C3348",
              border: "1px solid #2E4D66",
              zIndex: 50,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {suggestions.map((s) => (
              <button
                type="button"
                key={s}
                onMouseDown={() => {
                  onChange(s);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#24384A] transition-colors"
              >
                <MapPin
                  size={13}
                  style={{ color: "#F28A2A" }}
                  className="shrink-0"
                />
                <span className="text-white text-sm">{s}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RouteResultCard({
  route,
  onTrack,
}: { route: BusRoute; onTrack: (id: string) => void }) {
  const nextDep = getNextDeparture(route);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4"
      style={{ background: "#152635", border: "1px solid #24384A" }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(242,138,42,0.2)", color: "#F28A2A" }}
          >
            {route.number}
          </span>
          <span className="text-white font-semibold text-sm">
            {route.origin} → {route.destination}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1">
          <MapPin size={12} style={{ color: "#A9B6C3" }} />
          <span className="text-xs" style={{ color: "#A9B6C3" }}>
            {route.stops.length} stops
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Bus size={12} style={{ color: "#A9B6C3" }} />
          <span
            className="text-xs"
            style={{ color: nextDep ? "#22c55e" : "#A9B6C3" }}
          >
            {nextDep ? `Next: ${nextDep}` : "Last bus departed"}
          </span>
        </div>
      </div>
      <button
        type="button"
        data-ocid="home.track_live.button"
        onClick={() => onTrack(route.id)}
        className="w-full py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: "#2A8CFF", color: "white" }}
      >
        <span className="flex items-center justify-center gap-2">
          <Navigation size={14} />
          Track Live
        </span>
      </button>
    </motion.div>
  );
}

function ConnectingRouteCard({
  connecting,
  onTrack,
}: { connecting: ConnectingRoute; onTrack: (id: string) => void }) {
  const dep1 = getNextDeparture(connecting.leg1);
  const dep2 = getNextDeparture(connecting.leg2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-4"
      style={{
        background: "#152635",
        border: "1px solid rgba(42,140,255,0.3)",
      }}
    >
      {/* Header badges */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: "rgba(42,140,255,0.18)", color: "#2A8CFF" }}
        >
          1 Change
        </span>
        <span className="text-xs" style={{ color: "#A9B6C3" }}>
          via {connecting.changeAt}
        </span>
      </div>

      {/* Leg 1 */}
      <div
        className="rounded-xl p-3 mb-2"
        style={{
          background: "rgba(15,36,51,0.6)",
          border: "1px solid #24384A",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="px-1.5 py-0.5 rounded text-xs font-bold shrink-0"
            style={{ background: "rgba(242,138,42,0.2)", color: "#F28A2A" }}
          >
            {connecting.leg1.number}
          </span>
          <span className="text-white text-xs font-medium truncate">
            {connecting.leg1.origin} → {connecting.changeAt}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Bus size={11} style={{ color: "#A9B6C3" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: dep1 ? "#22c55e" : "#A9B6C3" }}
          >
            {dep1 ? `Departs ${dep1}` : "Last bus departed"}
          </span>
        </div>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-2 my-2 px-1">
        <div className="flex-1 h-px" style={{ background: "#24384A" }} />
        <div className="flex items-center gap-1.5">
          <RefreshCw size={11} style={{ color: "#2A8CFF" }} />
          <span className="text-xs" style={{ color: "#2A8CFF" }}>
            Change bus at {connecting.changeAt}
          </span>
        </div>
        <div className="flex-1 h-px" style={{ background: "#24384A" }} />
      </div>

      {/* Leg 2 */}
      <div
        className="rounded-xl p-3 mb-3"
        style={{
          background: "rgba(15,36,51,0.6)",
          border: "1px solid #24384A",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="px-1.5 py-0.5 rounded text-xs font-bold shrink-0"
            style={{ background: "rgba(242,138,42,0.2)", color: "#F28A2A" }}
          >
            {connecting.leg2.number}
          </span>
          <span className="text-white text-xs font-medium truncate">
            {connecting.changeAt} → {connecting.leg2.destination}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Bus size={11} style={{ color: "#A9B6C3" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: dep2 ? "#22c55e" : "#A9B6C3" }}
          >
            {dep2 ? `Departs ${dep2}` : "Last bus departed"}
          </span>
        </div>
      </div>

      {/* Track buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          data-ocid="home.track_leg1.button"
          onClick={() => onTrack(connecting.leg1.id)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-1"
          style={{ background: "rgba(42,140,255,0.2)", color: "#2A8CFF" }}
        >
          <Navigation size={12} /> Leg 1
        </button>
        <ArrowRight
          size={16}
          style={{ color: "#A9B6C3" }}
          className="self-center shrink-0"
        />
        <button
          type="button"
          data-ocid="home.track_leg2.button"
          onClick={() => onTrack(connecting.leg2.id)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-1"
          style={{ background: "rgba(42,140,255,0.2)", color: "#2A8CFF" }}
        >
          <Navigation size={12} /> Leg 2
        </button>
      </div>
    </motion.div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<BusRoute[] | null>(null);
  const [connectingResults, setConnectingResults] = useState<ConnectingRoute[]>(
    [],
  );
  const [searched, setSearched] = useState(false);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleFind = () => {
    const found = searchRoutesByStops(from, to);
    setResults(found);
    setSearched(true);
    if (found.length === 0) {
      setConnectingResults(searchConnectingRoutes(from, to));
    } else {
      setConnectingResults([]);
    }
  };

  const handleTrack = (routeId: string) => {
    navigate({ to: "/track", search: { routeId } });
  };

  const goToTracker = () => {
    navigate({ to: "/track", search: { routeId: undefined } });
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background: "linear-gradient(180deg, #0B1520 0%, #0F2433 100%)",
      }}
    >
      <header
        data-ocid="home.section"
        className="flex items-center justify-between px-4 py-4 sticky top-0 z-40"
        style={{
          background: "rgba(11,21,32,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #24384A",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#F28A2A" }}
          >
            <Bus size={16} color="white" />
          </div>
          <span className="font-bold text-lg text-white">Bus Trackr</span>
        </div>
      </header>

      <main className="px-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6 pb-4"
        >
          <h1 className="text-2xl font-bold text-white leading-tight mb-1">
            Where are you going?
          </h1>
          <p className="text-sm mb-4" style={{ color: "#A9B6C3" }}>
            Search Haryana Roadways buses by route
          </p>

          {/* From → To Panel */}
          <div
            className="rounded-2xl overflow-visible mb-4"
            style={{ background: "#152635", border: "1px solid #24384A" }}
          >
            {/* From input */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 relative">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "#F28A2A" }}
              />
              <StopInput
                value={from}
                onChange={setFrom}
                placeholder="From — origin city or stop"
                dataOcid="home.from.input"
              />
            </div>

            {/* Divider + Swap */}
            <div className="flex items-center px-4">
              <div className="flex-1 h-px" style={{ background: "#24384A" }} />
              <button
                type="button"
                data-ocid="home.swap.button"
                onClick={handleSwap}
                className="mx-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "#1C3348", border: "1px solid #2E4D66" }}
              >
                <ArrowLeftRight size={14} style={{ color: "#A9B6C3" }} />
              </button>
            </div>

            {/* To input */}
            <div className="flex items-center gap-3 px-4 pt-3 pb-4 relative">
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: "#2A8CFF" }}
              />
              <StopInput
                value={to}
                onChange={setTo}
                placeholder="To — destination city or stop"
                dataOcid="home.to.input"
              />
            </div>
          </div>

          <button
            type="button"
            data-ocid="home.find_buses.button"
            onClick={handleFind}
            disabled={!from.trim() || !to.trim()}
            className="w-full py-3 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #F28A2A, #d4741f)",
            }}
          >
            Find Buses
          </button>
        </motion.section>

        {/* Search Results */}
        <AnimatePresence>
          {searched && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              {results && results.length > 0 ? (
                <>
                  <h2 className="text-base font-semibold text-white mb-3">
                    {results.length} route{results.length > 1 ? "s" : ""} found
                  </h2>
                  <div className="flex flex-col gap-3">
                    {results.map((route) => (
                      <RouteResultCard
                        key={route.id}
                        route={route}
                        onTrack={handleTrack}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* No direct buses */}
                  <div
                    data-ocid="home.results.empty_state"
                    className="rounded-2xl p-5 text-center mb-4"
                    style={{
                      background: "#152635",
                      border: "1px solid #24384A",
                    }}
                  >
                    <Bus
                      size={28}
                      style={{ color: "#24384A" }}
                      className="mx-auto mb-2"
                    />
                    <p className="text-white font-semibold mb-1">
                      No direct buses found
                    </p>
                    <p className="text-xs" style={{ color: "#A9B6C3" }}>
                      No direct route between these stops — see connecting
                      options below.
                    </p>
                  </div>

                  {/* Connecting routes */}
                  {connectingResults.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <RefreshCw size={15} style={{ color: "#2A8CFF" }} />
                        <h2 className="text-base font-semibold text-white">
                          Connecting Routes
                          <span
                            className="ml-2 text-xs font-normal px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(42,140,255,0.15)",
                              color: "#2A8CFF",
                            }}
                          >
                            1 Change
                          </span>
                        </h2>
                      </div>
                      <div className="flex flex-col gap-3">
                        {connectingResults.map((cr, i) => (
                          <ConnectingRouteCard
                            key={`${cr.leg1.id}-${cr.changeAt}-${cr.leg2.id}-${i}`}
                            connecting={cr}
                            onTrack={handleTrack}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {connectingResults.length === 0 && (
                    <p
                      className="text-xs text-center"
                      style={{ color: "#A9B6C3" }}
                    >
                      No connecting routes found either. Try nearby stops or
                      check district timetables.
                    </p>
                  )}
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Popular Depots */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp size={18} style={{ color: "#F28A2A" }} />
              Popular Depots
            </h2>
            <button
              type="button"
              data-ocid="home.stops.link"
              onClick={() => navigate({ to: "/stops" })}
              className="text-xs font-medium"
              style={{ color: "#2A8CFF" }}
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {POPULAR_DEPOTS.map((depot, i) => (
              <motion.button
                type="button"
                key={depot.id}
                data-ocid={`home.depot.card.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() =>
                  navigate({ to: "/depot/$id", params: { id: depot.id } })
                }
                className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#152635", border: "1px solid #24384A" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "rgba(242,138,42,0.15)" }}
                >
                  <MapPin size={16} style={{ color: "#F28A2A" }} />
                </div>
                <p className="font-semibold text-white text-sm mb-1">
                  {depot.name}
                </p>
                <p className="text-xs" style={{ color: "#A9B6C3" }}>
                  {depot.buses} Buses
                </p>
                <p className="text-xs" style={{ color: "#A9B6C3" }}>
                  {depot.routes} Active Routes
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Live Tracker Preview */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Live Bus Tracker
          </h2>
          <button
            type="button"
            data-ocid="home.track.link"
            onClick={goToTracker}
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              background: "#152635",
              border: "1px solid #24384A",
              minHeight: 180,
            }}
          >
            <svg
              width="100%"
              height="180"
              viewBox="0 0 360 180"
              role="img"
              aria-label="Live bus map preview"
            >
              <title>Live bus map preview</title>
              <rect width="360" height="180" fill="#152635" />
              {[30, 60, 90, 120, 150].map((y) => (
                <line
                  key={`hy-${y}`}
                  x1="0"
                  y1={y}
                  x2="360"
                  y2={y}
                  stroke="#24384A"
                  strokeWidth="1"
                />
              ))}
              {[60, 120, 180, 240, 300].map((x) => (
                <line
                  key={`hx-${x}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="180"
                  stroke="#24384A"
                  strokeWidth="1"
                />
              ))}
              <path
                d="M 20 90 Q 100 40 180 90 Q 260 140 340 90"
                stroke="#F28A2A"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="6,3"
              />
              <path
                d="M 20 120 Q 120 70 220 110 Q 290 140 340 120"
                stroke="#2A8CFF"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="6,3"
              />
              <circle cx="180" cy="90" r="7" fill="#F28A2A" />
              <circle
                cx="180"
                cy="90"
                r="12"
                fill="rgba(242,138,42,0.25)"
                className="pulse-dot"
              />
              <circle cx="220" cy="110" r="7" fill="#2A8CFF" />
              <circle
                cx="220"
                cy="110"
                r="12"
                fill="rgba(42,140,255,0.25)"
                className="pulse-dot"
              />
              <text x="20" y="15" fill="#A9B6C3" fontSize="10">
                Live Bus Positions
              </text>
              <text x="240" y="175" fill="#A9B6C3" fontSize="9">
                Tap to Track →
              </text>
            </svg>
          </button>
        </section>
      </main>

      <BottomNav />

      <footer className="pb-24 text-center px-4">
        <p className="text-xs" style={{ color: "#A9B6C3" }}>
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#F28A2A" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
