import { Outlet, createFileRoute } from "@tanstack/react-router";

import AppLayout from "@/components/layout/AppLayout";

/**
 * Pathless layout route: wraps every section page in the app shell
 * (sidebar / bottom nav / header) without adding a URL segment.
 */
export const Route = createFileRoute("/_app")({
  component: AppLayoutRoute,
});

function AppLayoutRoute() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
