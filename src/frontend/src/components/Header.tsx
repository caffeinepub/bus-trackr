import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavClick: (section: string) => void;
}

const NAV_LINKS = [
  { id: "live-map", label: "Live Map" },
  { id: "routes", label: "Routes" },
  { id: "timetable", label: "Timetables" },
  { id: "stops", label: "Stops" },
  { id: "about", label: "About" },
];

export function Header({ activeSection, onNavClick }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border bg-white shadow-xs"
      data-ocid="header.panel"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold text-white"
            style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
          >
            HR
          </div>
          <span className="hidden text-sm font-semibold text-foreground sm:block">
            Haryana Roadways Transit
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className={`text-sm font-medium transition-colors hover:text-navy ${
                activeSection === link.id
                  ? "border-b-2 text-navy"
                  : "text-muted-foreground"
              }`}
              style={
                activeSection === link.id
                  ? {
                      borderColor: "oklch(0.22 0.055 243)",
                      color: "oklch(0.22 0.055 243)",
                    }
                  : {}
              }
              data-ocid={`header.${link.id}.link`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Button
          size="sm"
          className="text-white"
          style={{ backgroundColor: "oklch(0.22 0.055 243)" }}
          onClick={() => onNavClick("live-map")}
          data-ocid="header.track_button"
        >
          <MapPin className="mr-1.5 h-3.5 w-3.5" />
          Track Bus
        </Button>
      </div>
    </header>
  );
}
