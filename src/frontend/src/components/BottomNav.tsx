import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, Bus, Clock, Home, MapPin } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Track Bus", icon: Bus, path: "/track" },
  { label: "Depots", icon: MapPin, path: "/stops" },
  { label: "Timetable", icon: Clock, path: "/depot/ambala" },
  { label: "Reminders", icon: Bell, path: "/reminders" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const pathname = location.pathname;

  const handleNav = (path: string) => {
    if (path === "/track") {
      navigate({ to: "/track", search: { routeId: undefined } });
    } else if (path === "/depot/ambala") {
      navigate({ to: "/depot/$id", params: { id: "ambala" } });
    } else {
      navigate({ to: path as "/home" | "/stops" | "/reminders" });
    }
  };

  return (
    <nav
      data-ocid="bottom_nav"
      style={{ background: "#0F2433", borderTop: "1px solid #24384A" }}
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.path === "/depot/ambala"
            ? pathname.startsWith("/depot")
            : pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            type="button"
            key={item.path}
            data-ocid={`nav.${item.label.toLowerCase().replace(" ", "_")}.link`}
            onClick={() => handleNav(item.path)}
            className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] transition-colors"
          >
            <Icon
              size={22}
              style={{ color: isActive ? "#F28A2A" : "#A9B6C3" }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? "#F28A2A" : "#A9B6C3" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
