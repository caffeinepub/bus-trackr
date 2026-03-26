import { BottomNav } from "@/components/BottomNav";
import { DEPOTS, getRoutesForDepot } from "@/data/depots";
import { Bell, Clock, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface Reminder {
  id: string;
  depotId: string;
  depotName: string;
  routeId: string;
  routeLabel: string;
  stop: string;
  time: string;
  note: string;
  createdAt: number;
}

const STORAGE_KEY = "bus_trackr_reminders";

function loadReminders(): Reminder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveReminders(reminders: Reminder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(loadReminders);
  const [depotId, setDepotId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [stop, setStop] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const routes = depotId ? getRoutesForDepot(depotId) : [];
  const selectedRoute = routes.find((r) => r.id === routeId);

  const handleDepotChange = (val: string) => {
    setDepotId(val);
    setRouteId("");
    setStop("");
  };

  const handleRouteChange = (val: string) => {
    setRouteId(val);
    setStop("");
  };

  const handleSetReminder = () => {
    if (!depotId || !routeId || !stop || !time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const depot = DEPOTS.find((d) => d.id === depotId);
    const route = routes.find((r) => r.id === routeId);
    if (!depot || !route) return;

    const newReminder: Reminder = {
      id: `${Date.now()}`,
      depotId,
      depotName: depot.name,
      routeId,
      routeLabel: `${route.number}: ${route.origin} → ${route.destination}`,
      stop,
      time,
      note,
      createdAt: Date.now(),
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    saveReminders(updated);

    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          toast.success("Reminder set! You'll receive a notification.");
        } else {
          toast.success("Reminder saved!");
        }
      });
    } else {
      toast.success("Reminder saved!");
    }

    setDepotId("");
    setRouteId("");
    setStop("");
    setTime("");
    setNote("");
  };

  const handleDelete = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    saveReminders(updated);
    toast.success("Reminder deleted");
  };

  const inputStyle = {
    background: "#0F2433",
    border: "1px solid #24384A",
    color: "#F2F6FA",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 14,
    outline: "none",
    width: "100%",
  } as const;

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
        <Bell size={22} style={{ color: "#F28A2A" }} />
        <div>
          <h1 className="font-bold text-white text-lg">Reminders</h1>
          <p className="text-xs" style={{ color: "#A9B6C3" }}>
            Get notified before your bus
          </p>
        </div>
      </header>

      <main className="px-4 pt-4">
        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: "#152635", border: "1px solid #24384A" }}
          data-ocid="reminders.panel"
        >
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Plus size={16} style={{ color: "#F28A2A" }} />
            Set New Reminder
          </h2>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="rem-depot"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#A9B6C3" }}
              >
                Depot *
              </label>
              <select
                id="rem-depot"
                data-ocid="reminders.depot.select"
                value={depotId}
                onChange={(e) => handleDepotChange(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select a Depot</option>
                {DEPOTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="rem-route"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#A9B6C3" }}
              >
                Route *
              </label>
              <select
                id="rem-route"
                data-ocid="reminders.route.select"
                value={routeId}
                onChange={(e) => handleRouteChange(e.target.value)}
                disabled={!depotId}
                style={{ ...inputStyle, opacity: depotId ? 1 : 0.5 }}
              >
                <option value="">Select a Route</option>
                {routes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.number}: {r.origin} → {r.destination}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="rem-stop"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#A9B6C3" }}
              >
                Stop *
              </label>
              <select
                id="rem-stop"
                data-ocid="reminders.stop.select"
                value={stop}
                onChange={(e) => setStop(e.target.value)}
                disabled={!routeId}
                style={{ ...inputStyle, opacity: routeId ? 1 : 0.5 }}
              >
                <option value="">Select a Stop</option>
                {selectedRoute?.stops.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="rem-time"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#A9B6C3" }}
              >
                Reminder Time *
              </label>
              <input
                id="rem-time"
                data-ocid="reminders.time.input"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="rem-note"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#A9B6C3" }}
              >
                Note (optional)
              </label>
              <input
                id="rem-note"
                data-ocid="reminders.note.input"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Morning commute to office"
                style={inputStyle}
              />
            </div>

            <button
              type="button"
              data-ocid="reminders.submit.button"
              onClick={handleSetReminder}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#F28A2A", color: "white" }}
            >
              🔔 Set Reminder
            </button>
          </div>
        </div>

        <h2 className="font-semibold text-white mb-3">Saved Reminders</h2>

        {reminders.length === 0 ? (
          <div
            data-ocid="reminders.empty_state"
            className="rounded-2xl p-8 text-center"
            style={{ background: "#152635", border: "1px solid #24384A" }}
          >
            <Bell
              size={32}
              style={{ color: "#24384A" }}
              className="mx-auto mb-3"
            />
            <p className="text-white font-medium">No reminders yet</p>
            <p className="text-xs mt-1" style={{ color: "#A9B6C3" }}>
              Set a reminder above to get notified.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3" data-ocid="reminders.list">
              {reminders.map((rem, i) => (
                <motion.div
                  key={rem.id}
                  data-ocid={`reminders.item.${i + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="rounded-2xl p-4"
                  style={{ background: "#152635", border: "1px solid #24384A" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={13} style={{ color: "#F28A2A" }} />
                        <span className="font-semibold text-white text-sm">
                          {rem.time}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            background: "rgba(242,138,42,0.15)",
                            color: "#F28A2A",
                          }}
                        >
                          {rem.depotName}
                        </span>
                      </div>
                      <p
                        className="text-xs truncate"
                        style={{ color: "#A9B6C3" }}
                      >
                        {rem.routeLabel}
                      </p>
                      <p className="text-xs" style={{ color: "#A9B6C3" }}>
                        Stop: <span className="text-white">{rem.stop}</span>
                      </p>
                      {rem.note && (
                        <p
                          className="text-xs mt-1 italic"
                          style={{ color: "#A9B6C3" }}
                        >
                          {rem.note}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      data-ocid={`reminders.delete_button.${i + 1}`}
                      onClick={() => handleDelete(rem.id)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-opacity hover:opacity-80"
                      style={{ background: "rgba(239,68,68,0.15)" }}
                    >
                      <Trash2 size={14} style={{ color: "#ef4444" }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
