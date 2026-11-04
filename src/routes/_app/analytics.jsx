import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";

import { EmptyStateCard, SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Live current and power readings plus historical usage, from real sensors.",
      },
      { property: "og:title", content: "Analytics — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Live current and power readings plus historical usage, from real sensors.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AnalyticsPage() {
  return (
    <SectionPage
      title="Analytics"
      description="Real electrical readings and usage history — Pro plan feature."
    >
      <EmptyStateCard
        icon={LineChart}
        title="No sensor data yet"
        description="Analytics arrives with the data & monitoring phase. Charts show live current (amps) and power (watts) from actual energy-monitoring sensors on your ESP32 boxes — the platform never generates simulated readings."
        phase="Data & monitoring phase"
      />
    </SectionPage>
  );
}
