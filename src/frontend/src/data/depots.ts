import { AMBALA_ROUTES } from "./ambala";
import { BHIWANI_ROUTES } from "./bhiwani";
import { CHANDIGARH_ROUTES } from "./chandigarh";
import { CHARKHI_DADRI_ROUTES } from "./charkhi-dadri";
import { DELHI_ROUTES } from "./delhi";
import { FARIDABAD_ROUTES } from "./faridabad";
import { FATEHABAD_ROUTES } from "./fatehabad";
import { GURUGRAM_ROUTES } from "./gurugram";
import { HISAR_ROUTES } from "./hisar";
import { BAHADURGARH_ROUTES, JHAJJAR_ROUTES } from "./jhajjar";
import { JIND_ROUTES, NARWANA_ROUTES, SAFIDON_ROUTES } from "./jind";
import { KAITHAL_ROUTES } from "./kaithal";
import { KARNAL_ROUTES } from "./karnal";
import { KURUKSHETRA_ROUTES } from "./kurukshetra";
import {
  KANINA_ROUTES,
  MAHENDERGARH_ROUTES,
  NARNAUL_ROUTES,
  SATNALI_ROUTES,
} from "./narnaul";
import { PANCHKULA_ROUTES } from "./panchkula";
import { PANIPAT_ROUTES } from "./panipat";
import { ROHTAK_ROUTES } from "./rohtak";
import { SIRSA_ROUTES } from "./sirsa";

export interface BusStop {
  name: string;
}

export interface BusRoute {
  id: string;
  number: string;
  origin: string;
  destination: string;
  via?: string;
  departures: string[];
  stops: string[];
  durationMinutes: number;
  operator?: string;
  serviceType?: string;
  booth?: string;
  serviceDays?: string;
}

export interface Depot {
  id: string;
  name: string;
  buses: number;
  routes: number;
  district: string;
}

const DEP_HOURLY = [
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
const DEP_2H = [
  "05:00",
  "07:00",
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "17:00",
  "19:00",
  "21:00",
];
const DEP_3H = ["05:00", "08:00", "11:00", "14:00", "17:00", "20:00"];

export const DEPOTS: Depot[] = [
  { id: "ambala", name: "Ambala", buses: 180, routes: 63, district: "Ambala" },
  {
    id: "bhiwani",
    name: "Bhiwani",
    buses: 220,
    routes: 113,
    district: "Bhiwani",
  },
  {
    id: "charkhi-dadri",
    name: "Charkhi Dadri",
    buses: 22,
    routes: 6,
    district: "Charkhi Dadri",
  },
  {
    id: "delhi",
    name: "Delhi ISBT (Kashmiri Gate / SKK / Anand Vihar)",
    buses: 500,
    routes: 1107,
    district: "Delhi",
  },
  {
    id: "faridabad",
    name: "Faridabad",
    buses: 62,
    routes: 55,
    district: "Faridabad",
  },
  {
    id: "fatehabad",
    name: "Fatehabad",
    buses: 85,
    routes: 65,
    district: "Fatehabad",
  },
  {
    id: "gurugram",
    name: "Gurugram",
    buses: 70,
    routes: 18,
    district: "Gurugram",
  },
  { id: "hisar", name: "Hisar", buses: 200, routes: 120, district: "Hisar" },
  {
    id: "jhajjar",
    name: "Jhajjar",
    buses: 320,
    routes: 27,
    district: "Jhajjar",
  },
  { id: "jind", name: "Jind", buses: 120, routes: 200, district: "Jind" },
  { id: "narwana", name: "Narwana", buses: 30, routes: 20, district: "Jind" },
  { id: "safidon", name: "Safidon", buses: 20, routes: 18, district: "Jind" },
  {
    id: "kaithal",
    name: "Kaithal",
    buses: 180,
    routes: 48,
    district: "Kaithal",
  },
  { id: "karnal", name: "Karnal", buses: 180, routes: 48, district: "Karnal" },
  {
    id: "kurukshetra",
    name: "Kurukshetra",
    buses: 55,
    routes: 41,
    district: "Kurukshetra",
  },
  {
    id: "narnaul",
    name: "Narnaul",
    buses: 120,
    routes: 40,
    district: "Mahendragarh",
  },
  {
    id: "mahendergarh",
    name: "Mahendergarh",
    buses: 80,
    routes: 30,
    district: "Mahendragarh",
  },
  {
    id: "kanina",
    name: "Kanina",
    buses: 60,
    routes: 20,
    district: "Mahendragarh",
  },
  {
    id: "satnali",
    name: "Satnali",
    buses: 40,
    routes: 15,
    district: "Mahendragarh",
  },
  {
    id: "chandigarh-isbt",
    name: "Chandigarh ISBT",
    buses: 200,
    routes: 768,
    district: "Chandigarh",
  },
  { id: "nuh", name: "Nuh (Mewat)", buses: 20, routes: 5, district: "Nuh" },
  { id: "palwal", name: "Palwal", buses: 27, routes: 7, district: "Palwal" },
  {
    id: "panchkula",
    name: "Panchkula",
    buses: 42,
    routes: 11,
    district: "Panchkula",
  },
  {
    id: "panipat",
    name: "Panipat",
    buses: 120,
    routes: 303,
    district: "Panipat",
  },
  { id: "rewari", name: "Rewari", buses: 33, routes: 8, district: "Rewari" },
  { id: "rohtak", name: "Rohtak", buses: 58, routes: 15, district: "Rohtak" },
  { id: "sirsa", name: "Sirsa", buses: 120, routes: 1060, district: "Sirsa" },
  {
    id: "sonipat",
    name: "Sonipat",
    buses: 45,
    routes: 12,
    district: "Sonipat",
  },
  {
    id: "yamunanagar",
    name: "Yamunanagar",
    buses: 38,
    routes: 10,
    district: "Yamunanagar",
  },
];

export const DEPOT_ROUTES: Record<string, BusRoute[]> = {
  ambala: AMBALA_ROUTES,
  bhiwani: BHIWANI_ROUTES,
  "charkhi-dadri": CHARKHI_DADRI_ROUTES,
  delhi: DELHI_ROUTES,
  faridabad: FARIDABAD_ROUTES,
  fatehabad: FATEHABAD_ROUTES,
  gurugram: GURUGRAM_ROUTES,
  hisar: HISAR_ROUTES,
  jhajjar: [...JHAJJAR_ROUTES, ...BAHADURGARH_ROUTES],
  jind: JIND_ROUTES,
  narwana: NARWANA_ROUTES,
  safidon: SAFIDON_ROUTES,
  kaithal: KAITHAL_ROUTES,
  karnal: KARNAL_ROUTES,
  kurukshetra: KURUKSHETRA_ROUTES,
  narnaul: NARNAUL_ROUTES,
  mahendergarh: MAHENDERGARH_ROUTES,
  kanina: KANINA_ROUTES,
  satnali: SATNALI_ROUTES,
  nuh: [
    {
      id: "nuh-01",
      number: "HR-131",
      origin: "Nuh",
      destination: "Gurugram",
      departures: DEP_HOURLY,
      stops: ["Nuh", "Sohna", "Gurugram"],
      durationMinutes: 60,
    },
    {
      id: "nuh-02",
      number: "HR-132",
      origin: "Nuh",
      destination: "Delhi ISBT",
      departures: DEP_2H,
      stops: ["Nuh", "Sohna", "Gurugram", "Delhi ISBT"],
      durationMinutes: 120,
    },
    {
      id: "nuh-03",
      number: "HR-133",
      origin: "Nuh",
      destination: "Faridabad",
      departures: DEP_2H,
      stops: ["Nuh", "Palwal", "Faridabad"],
      durationMinutes: 90,
    },
  ],
  palwal: [
    {
      id: "plw-01",
      number: "HR-141",
      origin: "Palwal",
      destination: "Delhi ISBT",
      departures: DEP_HOURLY,
      stops: ["Palwal", "Ballabhgarh", "Faridabad", "Delhi ISBT"],
      durationMinutes: 90,
    },
    {
      id: "plw-02",
      number: "HR-142",
      origin: "Palwal",
      destination: "Agra",
      departures: DEP_3H,
      stops: ["Palwal", "Hodal", "Mathura", "Agra"],
      durationMinutes: 180,
    },
    {
      id: "plw-03",
      number: "HR-143",
      origin: "Palwal",
      destination: "Nuh",
      departures: DEP_HOURLY,
      stops: ["Palwal", "Punhana", "Nuh"],
      durationMinutes: 60,
    },
  ],
  "chandigarh-isbt": CHANDIGARH_ROUTES,
  panchkula: PANCHKULA_ROUTES,
  panipat: PANIPAT_ROUTES,
  rewari: [
    {
      id: "rwr-01",
      number: "HR-171",
      origin: "Rewari",
      destination: "Delhi ISBT",
      departures: DEP_2H,
      stops: ["Rewari", "Dharuhera", "Gurugram", "Delhi ISBT"],
      durationMinutes: 130,
    },
    {
      id: "rwr-02",
      number: "HR-172",
      origin: "Rewari",
      destination: "Narnaul",
      departures: DEP_HOURLY,
      stops: ["Rewari", "Palhawas", "Narnaul"],
      durationMinutes: 60,
    },
    {
      id: "rwr-03",
      number: "HR-173",
      origin: "Rewari",
      destination: "Jhajjar",
      departures: DEP_HOURLY,
      stops: ["Rewari", "Kosli", "Jhajjar"],
      durationMinutes: 70,
    },
    {
      id: "rwr-04",
      number: "HR-174",
      origin: "Rewari",
      destination: "Jaipur",
      departures: DEP_3H,
      stops: ["Rewari", "Narnaul", "Bhiwadi", "Jaipur"],
      durationMinutes: 240,
    },
  ],
  rohtak: ROHTAK_ROUTES,
  sirsa: SIRSA_ROUTES,
  sonipat: [
    {
      id: "snp-01",
      number: "HR-201",
      origin: "Sonipat",
      destination: "Delhi ISBT",
      departures: DEP_HOURLY,
      stops: ["Sonipat", "Kundli", "Delhi ISBT"],
      durationMinutes: 70,
    },
    {
      id: "snp-02",
      number: "HR-202",
      origin: "Sonipat",
      destination: "Chandigarh",
      departures: DEP_3H,
      stops: [
        "Sonipat",
        "Panipat",
        "Karnal",
        "Kurukshetra",
        "Ambala",
        "Chandigarh",
      ],
      durationMinutes: 240,
    },
    {
      id: "snp-03",
      number: "HR-203",
      origin: "Sonipat",
      destination: "Rohtak",
      departures: DEP_HOURLY,
      stops: ["Sonipat", "Gohana", "Rohtak"],
      durationMinutes: 80,
    },
    {
      id: "snp-04",
      number: "HR-204",
      origin: "Sonipat",
      destination: "Jhajjar",
      departures: DEP_HOURLY,
      stops: ["Sonipat", "Jhajjar"],
      durationMinutes: 60,
    },
  ],
  yamunanagar: [
    {
      id: "ymn-01",
      number: "HR-211",
      origin: "Yamunanagar",
      destination: "Chandigarh",
      departures: DEP_2H,
      stops: ["Yamunanagar", "Ambala", "Zirakpur", "Chandigarh"],
      durationMinutes: 110,
    },
    {
      id: "ymn-02",
      number: "HR-212",
      origin: "Yamunanagar",
      destination: "Delhi ISBT",
      departures: DEP_3H,
      stops: ["Yamunanagar", "Ambala", "Karnal", "Panipat", "Delhi ISBT"],
      durationMinutes: 250,
    },
    {
      id: "ymn-03",
      number: "HR-213",
      origin: "Yamunanagar",
      destination: "Panchkula",
      departures: DEP_HOURLY,
      stops: ["Yamunanagar", "Barwala", "Panchkula"],
      durationMinutes: 70,
    },
    {
      id: "ymn-04",
      number: "HR-214",
      origin: "Yamunanagar",
      destination: "Kurukshetra",
      departures: DEP_2H,
      stops: ["Yamunanagar", "Jagadhri", "Ambala", "Kurukshetra"],
      durationMinutes: 90,
    },
  ],
};

export function getDepotById(id: string): Depot | undefined {
  return DEPOTS.find((d) => d.id === id);
}

export function getRoutesForDepot(depotId: string): BusRoute[] {
  return DEPOT_ROUTES[depotId] ?? [];
}

export function isRouteActive(route: BusRoute): boolean {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    const depMin = h * 60 + m;
    if (nowMin >= depMin && nowMin < depMin + route.durationMinutes)
      return true;
  }
  return false;
}

export function getActiveRoutes(): BusRoute[] {
  return getAllRoutes().filter(isRouteActive);
}

export function getCurrentStop(route: BusRoute): {
  stopIndex: number;
  progressPct: number;
} {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let activeDepMin = -1;
  for (const dep of route.departures) {
    const [h, m] = dep.split(":").map(Number);
    const dm = h * 60 + m;
    if (nowMin >= dm && nowMin < dm + route.durationMinutes) {
      activeDepMin = dm;
      break;
    }
  }
  if (activeDepMin < 0) return { stopIndex: 0, progressPct: 0 };
  const elapsed = nowMin - activeDepMin;
  const progressPct = Math.min((elapsed / route.durationMinutes) * 100, 100);
  const stopIndex = Math.floor(
    (elapsed / route.durationMinutes) * (route.stops.length - 1),
  );
  return { stopIndex, progressPct };
}

export function getAllRoutes(): BusRoute[] {
  return Object.values(DEPOT_ROUTES).flat();
}

export function searchRoutesByStops(from: string, to: string): BusRoute[] {
  if (!from.trim() || !to.trim()) return [];
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  return getAllRoutes().filter((route) => {
    const stopNames = route.stops.map((s) => s.toLowerCase());
    const fromIdx = stopNames.findIndex((s) => s.includes(f));
    const toIdx = stopNames.findIndex((s) => s.includes(t));
    return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
  });
}

export function getAllStopNames(): string[] {
  const names = new Set<string>();
  for (const r of getAllRoutes()) for (const s of r.stops) names.add(s);
  return Array.from(names).sort();
}
