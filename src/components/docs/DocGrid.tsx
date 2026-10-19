import type { DocSummary } from "@/types/doc";
import { DocCard } from "./DocCard";
import { EmptyState } from "./EmptyState";

export function DocGrid({ docs, emptyMessage }: { docs: DocSummary[]; emptyMessage?: string }) {
  if (docs.length === 0) return <EmptyState title={emptyMessage ?? "문서가 없습니다."} />;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {docs.map((d) => (
        <DocCard key={d.id} doc={d} />
      ))}
    </div>
  );
}
