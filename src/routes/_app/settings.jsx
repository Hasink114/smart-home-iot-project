import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";

import { EmptyStateCard, SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Account, home details and platform preferences.",
      },
      { property: "og:title", content: "Settings — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Account, home details and platform preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SettingsPage() {
  return (
    <SectionPage title="Settings" description="Account and platform preferences.">
      <EmptyStateCard
        icon={SettingsIcon}
        title="Settings arrive with the accounts phase"
        description="Sign in first: account details, your home profile, notification preferences and data controls will appear here once authentication is connected to Firebase."
        phase="Auth & onboarding phase"
      />
    </SectionPage>
  );
}
