import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function CategoryBadge({ name, count, link = true }: { name: string; count?: number; link?: boolean }) {
  const badge = (
    <Badge variant="secondary" className="text-sm">
      {name}
      {count !== undefined && <span className="ml-1 text-muted-foreground">{count}</span>}
    </Badge>
  );
  return link ? <Link href={`/category/${encodeURIComponent(name)}`}>{badge}</Link> : badge;
}
