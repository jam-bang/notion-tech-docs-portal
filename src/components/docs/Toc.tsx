import type { TocItem } from "@/types/doc";
import { cn } from "@/lib/utils";

export function Toc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="목차" className="text-sm">
      <p className="mb-2 font-semibold">목차</p>
      <ul className="space-y-1.5 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:border-primary hover:text-foreground",
                item.level === 3 && "pl-6",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
