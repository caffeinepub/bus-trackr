import { BottomNav } from "@/components/BottomNav";
import { DEPOTS } from "@/data/depots";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Bus, MapPin, Route } from "lucide-react";
import { motion } from "motion/react";

export function StopsPage() {
  const navigate = useNavigate();

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
          data-ocid="stops.back.button"
          onClick={() => navigate({ to: "/home" })}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#152635" }}
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <div>
          <h1 className="font-bold text-white text-lg leading-tight">
            All Depots
          </h1>
          <p className="text-xs" style={{ color: "#A9B6C3" }}>
            22 Haryana Districts
          </p>
        </div>
      </header>

      <main className="px-4 pt-4">
        <div data-ocid="stops.list" className="grid grid-cols-2 gap-3">
          {DEPOTS.map((depot, i) => (
            <motion.button
              type="button"
              key={depot.id}
              data-ocid={`stops.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() =>
                navigate({ to: "/depot/$id", params: { id: depot.id } })
              }
              className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#152635", border: "1px solid #24384A" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(242,138,42,0.15)" }}
              >
                <MapPin size={18} style={{ color: "#F28A2A" }} />
              </div>
              <p className="font-semibold text-white text-sm leading-tight mb-2">
                {depot.name}
              </p>
              <div className="flex items-center gap-1 mb-1">
                <Bus size={12} style={{ color: "#A9B6C3" }} />
                <span className="text-xs" style={{ color: "#A9B6C3" }}>
                  {depot.buses} Buses
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Route size={12} style={{ color: "#2A8CFF" }} />
                <span className="text-xs" style={{ color: "#2A8CFF" }}>
                  {depot.routes} Routes
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
