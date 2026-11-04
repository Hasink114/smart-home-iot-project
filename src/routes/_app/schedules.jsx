import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";

import { EmptyStateCard, SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/schedules")({
  component: SchedulesPage,
  head: () => ({
    meta: [
      { title: "Schedules — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Automate appliances with on/off schedules executed by your ESP32 boxes.",
      },
      { property: "og:title", content: "Schedules — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Automate appliances with on/off schedules executed by your ESP32 boxes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SchedulesPage() {
  return (
    <SectionPage
      title="Schedules"
      description="Timed on/off automation for your devices — Pro plan feature."
    >
      <EmptyStateCard
        icon={CalendarClock}
        title="No schedules yet"
        description="Schedule management arrives with the automation phase: set times for any device, and the platform writes them to Firebase for your ESP32 boxes to execute."
        phase="Automation phase"
      />
    </SectionPage>
  );
}
