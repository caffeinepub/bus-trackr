import { ROUTES } from "@/data/routes";
import { Bus, Clock, MapPin, Route } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { label: "Active Routes", value: ROUTES.length.toString(), icon: Route },
  { label: "Cities Covered", value: "12+", icon: MapPin },
  {
    label: "Daily Departures",
    value: `${ROUTES.reduce((a, r) => a + r.departures.length, 0)}+`,
    icon: Clock,
  },
  { label: "Total Stops", value: "25+", icon: Bus },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-14" data-ocid="about.section">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              About Haryana Roadways Transit
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Haryana Roadways is the state-owned public bus service of Haryana,
              India. Operating since 1971, it connects major cities and rural
              areas across the state with an extensive network of routes.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Our real-time tracking system helps commuters plan their journeys
              efficiently by providing live bus positions, timetable
              information, and stop-by-stop arrival estimates.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Routes span from Chandigarh in the north to Delhi in the south,
              and from Gurugram in the southwest to Sirsa in the west — covering
              every district of Haryana.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-5 shadow-card"
                >
                  <stat.icon
                    className="mb-3 h-7 w-7"
                    style={{ color: "oklch(0.22 0.055 243)" }}
                  />
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "oklch(0.22 0.055 243)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
