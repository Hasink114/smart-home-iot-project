import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  DoorOpen,
  Plug,
  LineChart,
  CalendarClock,
  CreditCard,
  Settings,
  HousePlug,
  CircleAlert,
} from "lucide-react";

import { firebaseConfigured, missingFirebaseKeys } from "@/firebase/firebase";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, description: "Home overview" },
  { to: "/rooms", label: "Rooms", icon: DoorOpen, description: "Rooms & ESP32 boxes" },
  { to: "/devices", label: "Devices", icon: Plug, description: "Connected appliances" },
  { to: "/analytics", label: "Analytics", icon: LineChart, description: "Power & usage history" },
  { to: "/schedules", label: "Schedules", icon: CalendarClock, description: "Automated on/off times" },
  { to: "/subscription", label: "Subscription", icon: CreditCard, description: "Free & Pro plans" },
  { to: "/settings", label: "Settings", icon: Settings, description: "Account & preferences" },
];

const NAV_ITEM_CLASSES =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:bg-secondary hover:text-foreground";

const ACTIVE_ITEM_CLASSES = "bg-accent text-accent-foreground";

function NavLinkItem({ item, onNavigate }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      activeOptions={{ exact: item.to === "/" }}
      className={NAV_ITEM_CLASSES}
      activeProps={{ className: ACTIVE_ITEM_CLASSES }}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span>{item.label}</span>
    </Link>
  );
}

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-2 py-1">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <HousePlug className="size-5" aria-hidden />
      </span>
      <span className="text-base font-bold tracking-tight text-foreground">
        Smart Home IoT
      </span>
    </Link>
  );
}

function ConfigStatusChip() {
  if (firebaseConfigured) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
        <span className="size-1.5 rounded-full bg-success" aria-hidden />
        Firebase connected
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground"
      title={`Missing: ${missingFirebaseKeys.join(", ")}`}
    >
      <CircleAlert className="size-3.5" aria-hidden />
      Awaiting Firebase setup
    </span>
  );
}

/**
 * App shell: fixed sidebar on desktop, bottom tab bar on mobile, sticky header.
 * Every page route renders inside this layout via src/routes/AppLayoutRoute.jsx.
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        <BrandMark />
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <NavLinkItem key={item.to} item={item} />
          ))}
        </nav>
        <div className="border-t border-border pt-4">
          <ConfigStatusChip />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <BrandMark />
          <ConfigStatusChip />
        </div>
      </header>

      {/* Main content */}
      <main className="pb-24 lg:pb-0 lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden"
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-accent-foreground"
              >
                <Icon className="size-5" aria-hidden />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
