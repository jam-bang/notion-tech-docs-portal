import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => `${basePath}?page=${p}`;
  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="페이지 이동">
      <Button variant="outline" size="sm" asChild disabled={page <= 1}>
        {page <= 1 ? <span aria-disabled>이전</span> : <Link href={href(page - 1)}>이전</Link>}
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Button key={p} variant={p === page ? "default" : "ghost"} size="sm" asChild>
          <Link href={href(p)} aria-current={p === page ? "page" : undefined}>
            {p}
          </Link>
        </Button>
      ))}
      <Button variant="outline" size="sm" asChild disabled={page >= totalPages}>
        {page >= totalPages ? <span aria-disabled>다음</span> : <Link href={href(page + 1)}>다음</Link>}
      </Button>
    </nav>
  );
}
