import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  KeyRound,
  DoorOpen,
  Plug,
  Wifi,
  ArrowRight,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageParts";
import { firebaseConfigured, missingFirebaseKeys } from "@/firebase/firebase";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Home overview: live room and appliance status, connectivity and recent activity.",
      },
      { property: "og:title", content: "Dashboard — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Home overview: live room and appliance status, connectivity and recent activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const SETUP_STEPS = [
  {
    icon: KeyRound,
    title: "Connect Firebase",
    body: firebaseConfigured
      ? "Firebase configuration detected — the app can talk to your project."
      : `Add the Firebase web config values to .env to connect the platform. Missing: ${missingFirebaseKeys.join(", ")}.`,
    done: firebaseConfigured,
  },
  {
    icon: DoorOpen,
    title: "Create your home and rooms",
    body: "Rooms management arrives with the next phase — each room can host one ESP32 control box.",
  },
  {
    icon: Plug,
    title: "Register devices and control boxes",
    body: "Add appliances connected to relay modules and pair their ESP32 boxes.",
  },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your home at a glance: room status, appliance controls and connectivity."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {SETUP_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  step.done
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  {step.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-base font-semibold text-foreground">Explore the sections</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The platform is being built in phases. Live data appears as each section is
          connected to Firebase — nothing below shows simulated readings.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { to: "/rooms", label: "Rooms" },
            { to: "/devices", label: "Devices" },
            { to: "/analytics", label: "Analytics" },
            { to: "/schedules", label: "Schedules" },
            { to: "/subscription", label: "Subscription" },
            { to: "/settings", label: "Settings" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
        <Wifi className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">How commands work:</span>{" "}
          sending an ON command requests a state change — the appliance is confirmed
          on only when the ESP32 reports it back. Power and current numbers come from
          real sensors, never estimates.
        </p>
      </div>
    </>
  );
}
