import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES, type Route } from "@/data/routes";
import { Bookmark, Clock } from "lucide-react";
import { motion } from "motion/react";
import { RouteCard } from "./RouteCard";

const QUICK_ACCESS = [
  { from: "Chandigarh ISBT", to: "Delhi ISBT", route: "141", time: "06:00" },
  { from: "Ambala City", to: "Hisar Bus Stand", route: "201", time: "06:30" },
  { from: "Delhi ISBT", to: "Rohtak", route: "55", time: "07:00" },
  { from: "Gurugram Sec 14", to: "Chandigarh", route: "88", time: "05:30" },
];

interface RoutesSectionProps {
  onRouteSelect: (route: Route) => void;
}

export function RoutesSection({ onRouteSelect }: RoutesSectionProps) {
  return (
    <section
      id="routes"
      className="bg-background py-14"
      data-ocid="routes.section"
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
            Bus Services &amp; Tracking
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse all active routes across Haryana. Click any card to see live
            stop tracking.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {ROUTES.map((route, i) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <RouteCard
                    route={route}
                    index={i + 1}
                    onViewDetails={onRouteSelect}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72">
            <Card
              className="border border-border bg-card shadow-card"
              data-ocid="routes.quick_access.panel"
            >
              <CardHeader
                className="pb-3"
                style={{
                  backgroundColor: "oklch(0.95 0.04 145)",
                  borderRadius: "0.5rem 0.5rem 0 0",
                }}
              >
                <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                  <Bookmark
                    className="h-4 w-4"
                    style={{ color: "oklch(0.22 0.055 243)" }}
                  />
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {QUICK_ACCESS.map((item, i) => (
                    <button
                      type="button"
                      key={item.route}
                      onClick={() => {
                        const r = ROUTES.find((r) => r.id === item.route);
                        if (r) onRouteSelect(r);
                      }}
                      className="w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-accent"
                      data-ocid={`routes.quick_access.item.${i + 1}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
                        >
                          {item.route}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {item.time}
                        </span>
                      </div>
                      <div className="mt-1.5 text-xs font-medium text-foreground">
                        {item.from}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        → {item.to}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
