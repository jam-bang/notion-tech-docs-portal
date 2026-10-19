import { cn } from "@/lib/utils";

export function TagChip({ tag, active, onClick }: { tag: string; active?: boolean; onClick?: () => void }) {
  const cls = cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs",
    active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground",
    onClick && "cursor-pointer hover:border-primary",
  );
  return onClick ? (
    <button type="button" className={cls} onClick={onClick} aria-pressed={active}>
      #{tag}
    </button>
  ) : (
    <span className={cls}>#{tag}</span>
  );
}
