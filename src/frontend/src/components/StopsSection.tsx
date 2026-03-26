import { ROUTES } from "@/data/routes";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

// Collect all unique stops
const ALL_STOPS = Array.from(
  new Map(ROUTES.flatMap((r) => r.stops.map((s) => [s.name, s.name]))).values(),
).sort();

export function StopsSection() {
  return (
    <section
      id="stops"
      className="bg-background py-14"
      data-ocid="stops.section"
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
            All Bus Stops
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {ALL_STOPS.length} stops served across Haryana Roadways network.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          data-ocid="stops.list"
        >
          {ALL_STOPS.map((stop, i) => (
            <motion.div
              key={stop}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs text-foreground shadow-xs hover:shadow-card transition-shadow"
            >
              <MapPin
                className="h-3 w-3 shrink-0"
                style={{ color: "oklch(0.22 0.055 243)" }}
              />
              <span className="truncate font-medium">{stop}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
