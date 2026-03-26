import { useNavigate } from "@tanstack/react-router";
import { Bus } from "lucide-react";
import { useEffect, useState } from "react";

export function SplashPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => navigate({ to: "/home" }), 400);
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #0B1520 0%, #0F2433 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div
          className="bus-animate"
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "linear-gradient(135deg, #F28A2A, #d4741f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(242,138,42,0.35)",
          }}
        >
          <Bus size={48} color="white" strokeWidth={2} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Bus Trackr
          </h1>
          <p style={{ fontSize: "0.875rem", marginTop: 8, color: "#A9B6C3" }}>
            Haryana Roadways — Track. Plan. Ride.
          </p>
        </div>
        <div
          style={{
            width: 256,
            height: 4,
            borderRadius: 9999,
            overflow: "hidden",
            background: "#24384A",
          }}
        >
          <div
            className="splash-bar"
            style={{
              height: "100%",
              borderRadius: 9999,
              background: "#F28A2A",
            }}
          />
        </div>
      </div>
    </div>
  );
}
