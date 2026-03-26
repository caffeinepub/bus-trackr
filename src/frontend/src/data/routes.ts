export interface Stop {
  name: string;
  time: string;
  distance: number;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  status: "On Time" | "Delayed";
  stops: Stop[];
  departures: string[];
}

export const ROUTES: Route[] = [
  {
    id: "141",
    name: "Chandigarh ↔ Delhi",
    origin: "Chandigarh ISBT",
    destination: "Delhi ISBT Kashmere Gate",
    status: "On Time",
    stops: [
      { name: "Chandigarh ISBT", time: "06:00", distance: 0 },
      { name: "Zirakpur", time: "06:20", distance: 12 },
      { name: "Ambala City", time: "07:10", distance: 50 },
      { name: "Kurukshetra", time: "08:00", distance: 90 },
      { name: "Karnal", time: "08:30", distance: 120 },
      { name: "Panipat", time: "09:10", distance: 160 },
      { name: "Sonipat", time: "09:50", distance: 200 },
      { name: "Delhi ISBT Kashmere Gate", time: "10:30", distance: 245 },
    ],
    departures: ["06:00", "08:30", "11:00", "13:30", "16:00", "18:30", "21:00"],
  },
  {
    id: "102",
    name: "Chandigarh ↔ Ambala",
    origin: "Chandigarh ISBT",
    destination: "Ambala Cantonment",
    status: "On Time",
    stops: [
      { name: "Chandigarh ISBT", time: "07:00", distance: 0 },
      { name: "Zirakpur", time: "07:20", distance: 12 },
      { name: "Banur", time: "07:35", distance: 22 },
      { name: "Rajpura", time: "07:50", distance: 35 },
      { name: "Ambala City", time: "08:20", distance: 50 },
      { name: "Ambala Cantonment", time: "08:40", distance: 58 },
    ],
    departures: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
  },
  {
    id: "201",
    name: "Ambala ↔ Hisar",
    origin: "Ambala City",
    destination: "Hisar Bus Stand",
    status: "Delayed",
    stops: [
      { name: "Ambala City", time: "06:30", distance: 0 },
      { name: "Naraingarh", time: "07:10", distance: 40 },
      { name: "Karnal", time: "08:00", distance: 80 },
      { name: "Kaithal", time: "09:00", distance: 130 },
      { name: "Narwana", time: "09:45", distance: 165 },
      { name: "Hansi", time: "10:30", distance: 195 },
      { name: "Hisar Bus Stand", time: "11:00", distance: 215 },
    ],
    departures: ["06:30", "09:30", "12:30", "15:30", "18:30"],
  },
  {
    id: "55",
    name: "Delhi ↔ Rohtak",
    origin: "Delhi ISBT Kashmere Gate",
    destination: "Rohtak Bus Stand",
    status: "On Time",
    stops: [
      { name: "Delhi ISBT Kashmere Gate", time: "07:00", distance: 0 },
      { name: "Mundka", time: "07:30", distance: 25 },
      { name: "Bahadurgarh", time: "08:00", distance: 45 },
      { name: "Jhajjar", time: "08:40", distance: 75 },
      { name: "Rohtak Bus Stand", time: "09:15", distance: 90 },
    ],
    departures: ["07:00", "09:00", "11:00", "14:00", "17:00", "20:00"],
  },
  {
    id: "88",
    name: "Gurugram ↔ Chandigarh",
    origin: "Gurugram Sector 14",
    destination: "Chandigarh ISBT",
    status: "On Time",
    stops: [
      { name: "Gurugram Sector 14", time: "05:30", distance: 0 },
      { name: "Rewari", time: "06:30", distance: 60 },
      { name: "Narnaul", time: "07:30", distance: 110 },
      { name: "Ambala City", time: "09:30", distance: 220 },
      { name: "Zirakpur", time: "10:10", distance: 258 },
      { name: "Chandigarh ISBT", time: "10:30", distance: 270 },
    ],
    departures: ["05:30", "08:00", "11:00", "14:00", "17:00"],
  },
  {
    id: "310",
    name: "Hisar ↔ Sirsa",
    origin: "Hisar Bus Stand",
    destination: "Sirsa Bus Stand",
    status: "Delayed",
    stops: [
      { name: "Hisar Bus Stand", time: "08:00", distance: 0 },
      { name: "Fatehabad", time: "09:00", distance: 70 },
      { name: "Sirsa Bus Stand", time: "10:00", distance: 120 },
    ],
    departures: ["08:00", "11:00", "14:00", "17:00", "20:00"],
  },
];

/** Get the next departure time from now */
export function getNextDeparture(departures: string[]): string {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (const dep of departures) {
    const [h, m] = dep.split(":").map(Number);
    if (h * 60 + m > currentMinutes) return dep;
  }
  return departures[0]; // wrap around to first next day
}

/** Calculate bus tracking position for the first departure */
export function getBusPosition(route: Route): {
  currentStopIndex: number;
  status: "arrived" | "current" | "upcoming"[];
  elapsedMinutes: number;
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Use first departure to calculate relative position
  const firstDep = route.departures[0];
  const [depH, depM] = firstDep.split(":").map(Number);
  const depMinutes = depH * 60 + depM;
  const elapsed = currentMinutes - depMinutes;

  if (elapsed < 0) {
    return { currentStopIndex: -1, status: [] as any, elapsedMinutes: elapsed };
  }

  // Convert stop times to minutes from departure
  const firstStopTime = route.stops[0].time;
  const [fH, fM] = firstStopTime.split(":").map(Number);
  const baseMinutes = fH * 60 + fM;

  let currentStopIndex = 0;
  for (let i = 0; i < route.stops.length; i++) {
    const [sH, sM] = route.stops[i].time.split(":").map(Number);
    const stopMinutes = sH * 60 + sM;
    const minutesSinceDep = stopMinutes - baseMinutes;
    if (elapsed >= minutesSinceDep) {
      currentStopIndex = i;
    }
  }

  return { currentStopIndex, status: [] as any, elapsedMinutes: elapsed };
}
