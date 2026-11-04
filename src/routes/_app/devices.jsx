import { createFileRoute } from "@tanstack/react-router";
import { Plug } from "lucide-react";

import { EmptyStateCard, SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/devices")({
  component: DevicesPage,
  head: () => ({
    meta: [
      { title: "Devices — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Register appliances on relay modules and control them from your dashboard.",
      },
      { property: "og:title", content: "Devices — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Register appliances on relay modules and control them from your dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function DevicesPage() {
  return (
    <SectionPage
      title="Devices"
      description="Appliances connected to relay modules, controlled by your ESP32 boxes."
    >
      <EmptyStateCard
        icon={Plug}
        title="No devices registered yet"
        description="Device registration arrives with the rooms & devices phase: add appliances, name them, and switch them on or off. Each device shows the state you requested (desired) and the state the ESP32 confirms (actual)."
        phase="Rooms & devices phase"
      />
    </SectionPage>
  );
}
