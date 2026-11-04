import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * Shared page header used by every section page.
 */
export function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Shared empty state card: icon, title, explanation of what will live here
 * once the corresponding phase lands. Honest by design — no fake data.
 */
export function EmptyStateCard({ icon: Icon, title, description, phase }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-card">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
        <Icon className="size-7" aria-hidden />
      </span>
      <h2 className="mt-5 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {phase ? (
        <span className="mt-5 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
          Planned for: {phase}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Section page wrapper: layout + page header + children content.
 */
export function SectionPage({ title, description, children }) {
  return (
    <>
      <PageHeader title={title} description={description} />
      {children}
    </>
  );
}
