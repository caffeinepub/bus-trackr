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
import { NUH_ROUTES } from "./nuh";
import { PALWAL_ROUTES } from "./palwal";
import { PANCHKULA_ROUTES } from "./panchkula";
import { PANIPAT_ROUTES } from "./panipat";
import { REWARI_ROUTES } from "./rewari";
import { ROHTAK_ROUTES } from "./rohtak";
import { SIRSA_ROUTES } from "./sirsa";
import { SONIPAT_ROUTES } from "./sonipat";
import { YAMUNANAGAR_ROUTES } from "./yamunanagar";

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

export interface ConnectingRoute {
  leg1: BusRoute;
  changeAt: string;
  leg2: BusRoute;
}

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
  { id: "nuh", name: "Nuh (Mewat)", buses: 45, routes: 40, district: "Nuh" },
  { id: "palwal", name: "Palwal", buses: 120, routes: 250, district: "Palwal" },
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
  { id: "rewari", name: "Rewari", buses: 120, routes: 400, district: "Rewari" },
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
  nuh: NUH_ROUTES,
  palwal: PALWAL_ROUTES,
  "chandigarh-isbt": CHANDIGARH_ROUTES,
  panchkula: PANCHKULA_ROUTES,
  panipat: PANIPAT_ROUTES,
  rewari: REWARI_ROUTES,
  rohtak: ROHTAK_ROUTES,
  sirsa: SIRSA_ROUTES,
  sonipat: SONIPAT_ROUTES,
  yamunanagar: YAMUNANAGAR_ROUTES,
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

export function searchConnectingRoutes(
  from: string,
  to: string,
): ConnectingRoute[] {
  if (!from.trim() || !to.trim()) return [];
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  const allRoutes = getAllRoutes();

  // Build stop->routes index
  const stopToRoutes = new Map<string, BusRoute[]>();
  for (const r of allRoutes) {
    for (const s of r.stops) {
      const key = s.toLowerCase();
      if (!stopToRoutes.has(key)) stopToRoutes.set(key, []);
      stopToRoutes.get(key)!.push(r);
    }
  }

  const results: ConnectingRoute[] = [];
  const seen = new Set<string>();

  for (const r1 of allRoutes) {
    const fromIdx = r1.stops.findIndex((s) => s.toLowerCase().includes(f));
    if (fromIdx === -1) continue;
    for (const changeStop of r1.stops.slice(fromIdx + 1)) {
      const cKey = changeStop.toLowerCase();
      for (const r2 of stopToRoutes.get(cKey) ?? []) {
        if (r2.id === r1.id) continue;
        const changeIdx = r2.stops.findIndex((s) => s.toLowerCase() === cKey);
        const toIdx = r2.stops.findIndex((s) => s.toLowerCase().includes(t));
        if (changeIdx !== -1 && toIdx !== -1 && changeIdx < toIdx) {
          const key = `${r1.id}|${changeStop}|${r2.id}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push({ leg1: r1, changeAt: changeStop, leg2: r2 });
            if (results.length >= 4) return results;
          }
        }
      }
    }
  }
  return results;
}

export function getAllStopNames(): string[] {
  const names = new Set<string>();
  for (const r of getAllRoutes()) for (const s of r.stops) names.add(s);
  return Array.from(names).sort();
}
