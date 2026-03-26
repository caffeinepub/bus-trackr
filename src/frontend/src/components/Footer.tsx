import { Bus } from "lucide-react";

const FOOTER_LINKS = {
  Routes: [
    "Chandigarh–Delhi (141)",
    "Chandigarh–Ambala (102)",
    "Ambala–Hisar (201)",
    "Delhi–Rohtak (55)",
    "Gurugram–Chandigarh (88)",
  ],
  Cities: [
    "Chandigarh",
    "Delhi",
    "Ambala",
    "Hisar",
    "Rohtak",
    "Gurugram",
    "Sirsa",
    "Karnal",
  ],
  Information: [
    "Timetables",
    "Live Tracking",
    "Bus Stops",
    "Fare Chart",
    "Season Pass",
  ],
  Contact: [
    "Help Desk: 1800-180-2877",
    "SMS: 7292-000-000",
    "Email: info@hrtc.gov.in",
    "Twitter: @HaryanaBus",
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer data-ocid="footer.panel">
      {/* Main footer */}
      <div
        className="py-12"
        style={{ backgroundColor: "oklch(0.18 0.055 243)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Logo row */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: "oklch(0.72 0.185 145)" }}
            >
              HR
            </div>
            <div>
              <div className="text-base font-bold text-white">
                Haryana Roadways Transit
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.65 0.01 240)" }}
              >
                Real-time Bus Tracking System
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <span
                        className="text-sm cursor-default transition-colors hover:text-white"
                        style={{ color: "oklch(0.72 0.01 240)" }}
                      >
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-4"
        style={{
          backgroundColor: "oklch(0.15 0.05 243)",
          borderColor: "oklch(0.25 0.04 243)",
        }}
      >
        <div
          className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 text-xs"
          style={{ color: "oklch(0.60 0.01 240)" }}
        >
          <span>
            © {year} Haryana Roadways Transit. All rights reserved. · Built with
            ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span className="flex items-center gap-1">
            <Bus className="h-3.5 w-3.5" />
            Made in India 🇮🇳
          </span>
        </div>
      </div>
    </footer>
  );
}
