import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
          data-ocid="splash.panel"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: "oklch(0.72 0.185 145)" }}
          >
            <span className="text-4xl font-bold text-white">HR</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-2 text-3xl font-bold text-white"
          >
            Haryana Roadways
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="mb-10 text-base"
            style={{ color: "oklch(0.72 0.01 240)" }}
          >
            Real-time Bus Tracking
          </motion.p>

          {/* Loading bar container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-64"
          >
            <div
              className="h-1 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "oklch(0.30 0.04 243)" }}
            >
              <div
                className="loading-bar h-full rounded-full"
                style={{ backgroundColor: "oklch(0.72 0.185 145)" }}
              />
            </div>

            {/* Spinner */}
            <div className="mt-6 flex justify-center">
              <div
                className="spinner h-6 w-6 rounded-full border-2 border-t-transparent"
                style={{
                  borderColor: "oklch(0.72 0.185 145)",
                  borderTopColor: "transparent",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
