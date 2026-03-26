import { useNavigate } from "@tanstack/react-router";
import { Bus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate({ to: "/home" }), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0B1520 0%, #0F2433 100%)",
      }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center bus-animate"
          style={{ background: "linear-gradient(135deg, #F28A2A, #d4741f)" }}
        >
          <Bus size={48} color="white" strokeWidth={2} />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Bus Trackr
          </h1>
          <p className="text-sm mt-2" style={{ color: "#A9B6C3" }}>
            Haryana Roadways — Track. Plan. Ride.
          </p>
        </div>
        <div
          className="w-64 h-1 rounded-full overflow-hidden"
          style={{ background: "#24384A" }}
        >
          <div
            className="h-full rounded-full splash-bar"
            style={{ background: "#F28A2A" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
