import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES, type Route } from "@/data/routes";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface HeroSectionProps {
  onRouteSelect: (route: Route) => void;
}

export function HeroSection({ onRouteSelect }: HeroSectionProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<Route[] | null>(null);

  const handleSearch = () => {
    if (!from && !to) {
      setResults(null);
      return;
    }
    const filtered = ROUTES.filter((r) => {
      const fromMatch =
        !from ||
        r.stops.some((s) => s.name.toLowerCase().includes(from.toLowerCase()));
      const toMatch =
        !to ||
        r.stops.some((s) => s.name.toLowerCase().includes(to.toLowerCase()));
      return fromMatch && toMatch;
    });
    setResults(filtered);
  };

  return (
    <section
      id="live-map"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.17 0.065 243) 0%, oklch(0.22 0.055 243) 50%, oklch(0.28 0.05 220) 100%)",
        minHeight: "520px",
      }}
      data-ocid="hero.section"
    >
      <div className="pointer-events-none absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: decorative only
            key={i}
            className="absolute h-px bg-white"
            style={{ top: `${10 + i * 12}%`, left: 0, right: 0, opacity: 0.5 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: "oklch(0.72 0.185 145 / 0.2)",
            color: "oklch(0.72 0.185 145)",
          }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-transit-green" />
          Live Tracking Active
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-3 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[52px]"
        >
          Live Haryana
          <br />
          Roadways Tracking
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10 max-w-xl text-base"
          style={{ color: "oklch(0.78 0.01 240)" }}
        >
          Track buses across Haryana in real time. View timetables, stop-by-stop
          arrivals, and live departure status for all major routes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="hero-from"
                className="mb-1 block text-xs font-medium text-white/70"
              >
                From
              </label>
              <Input
                id="hero-from"
                placeholder="e.g. Chandigarh ISBT"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-white/20 bg-white/90 text-foreground placeholder:text-muted-foreground"
                data-ocid="hero.from.input"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="hero-to"
                className="mb-1 block text-xs font-medium text-white/70"
              >
                To
              </label>
              <Input
                id="hero-to"
                placeholder="e.g. Delhi ISBT"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-white/20 bg-white/90 text-foreground placeholder:text-muted-foreground"
                data-ocid="hero.to.input"
              />
            </div>
            <div className="w-full sm:w-40">
              <label
                htmlFor="hero-time"
                className="mb-1 block text-xs font-medium text-white/70"
              >
                Time
              </label>
              <Input
                id="hero-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border-white/20 bg-white/90 text-foreground"
                data-ocid="hero.time.input"
              />
            </div>
            <Button
              type="button"
              onClick={handleSearch}
              className="w-full text-white sm:w-auto"
              style={{
                backgroundColor: "oklch(0.72 0.185 145)",
                color: "white",
              }}
              data-ocid="hero.search.primary_button"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Buses
            </Button>
          </div>
        </motion.div>

        {results !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
            data-ocid="hero.results.panel"
          >
            {results.length === 0 ? (
              <div
                className="rounded-lg p-4 text-sm"
                style={{
                  backgroundColor: "oklch(0.22 0.055 243 / 0.6)",
                  color: "white",
                }}
                data-ocid="hero.results.empty_state"
              >
                No routes found matching your search. Try different stop names.
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-medium text-white/70">
                  {results.length} route(s) found:
                </p>
                {results.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => onRouteSelect(r)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-white/20"
                    style={{
                      backgroundColor: "oklch(0.22 0.055 243 / 0.7)",
                      color: "white",
                    }}
                  >
                    <span>
                      <span
                        className="mr-2 rounded-md px-2 py-0.5 text-xs font-bold text-white"
                        style={{ backgroundColor: "oklch(0.72 0.185 145)" }}
                      >
                        {r.id}
                      </span>
                      {r.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor:
                          r.status === "On Time"
                            ? "oklch(0.72 0.185 145 / 0.2)"
                            : "oklch(0.63 0.22 27 / 0.2)",
                        color:
                          r.status === "On Time"
                            ? "oklch(0.72 0.185 145)"
                            : "oklch(0.75 0.18 27)",
                      }}
                    >
                      {r.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
