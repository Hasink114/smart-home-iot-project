import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Sparkles } from "lucide-react";

import { SectionPage } from "@/components/layout/PageParts";

export const Route = createFileRoute("/_app/subscription")({
  component: SubscriptionPage,
  head: () => ({
    meta: [
      { title: "Subscription — Smart Home IoT Platform" },
      {
        name: "description",
        content: "Free and Pro plans: rooms, devices, analytics and schedules.",
      },
      { property: "og:title", content: "Subscription — Smart Home IoT Platform" },
      {
        property: "og:description",
        content: "Free and Pro plans: rooms, devices, analytics and schedules.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PLANS = [
  {
    name: "Free",
    icon: CreditCard,
    highlight: false,
    features: [
      "One room",
      "Up to 2 devices in total",
      "Basic ON/OFF control",
    ],
  },
  {
    name: "Pro",
    icon: Sparkles,
    highlight: true,
    features: [
      "Unlimited rooms and devices",
      "Live current and power analytics",
      "Device schedules",
      "Advanced dashboard customization",
    ],
  },
];

function SubscriptionPage() {
  return (
    <SectionPage
      title="Subscription"
      description="Plan limits are enforced server-side when the platform goes live."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-card p-6 shadow-card ${
                plan.highlight ? "border-primary/40" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-10 items-center justify-center rounded-xl ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <h2 className="text-lg font-bold text-foreground">{plan.name}</h2>
                {plan.highlight ? (
                  <span className="ml-auto rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    Everything unlocked
                  </span>
                ) : null}
              </div>
              <ul className="mt-4 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${
                        plan.highlight ? "text-primary" : "text-muted-foreground"
                      }`}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-4 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-card">
        Plan switching and management arrive with the subscription phase. No payment
        gateway is connected — limits are checked by trusted backend logic, not just
        in the browser.
      </p>
    </SectionPage>
  );
}
