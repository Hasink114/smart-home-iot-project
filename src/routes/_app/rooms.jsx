import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen } from "lucide-react";

import { EmptyStateCard, SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/rooms")({
  component: RoomsPage,
  head: () => ({
    meta: [
      { title: "Rooms — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Create and manage rooms, each hosting an ESP32 control box for its appliances.",
      },
      { property: "og:title", content: "Rooms — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Create and manage rooms, each hosting an ESP32 control box for its appliances.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RoomsPage() {
  return (
    <SectionPage
      title="Rooms"
      description="Each room can have its own ESP32 control box that switches its appliances."
    >
      <EmptyStateCard
        icon={DoorOpen}
        title="No rooms yet"
        description="Room management lands in the next phase: create rooms, attach an ESP32 box to each, and see which appliances belong where. Free plan accounts get one room; Pro is unlimited."
        phase="Rooms & devices phase"
      />
    </SectionPage>
  );
}
