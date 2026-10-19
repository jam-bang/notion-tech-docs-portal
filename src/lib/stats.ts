import type { DocStatus, DocSummary } from "@/types/doc";

export interface DocStats {
  total: number;
  byStatus: Record<DocStatus, number>;
  byCategory: { name: string; count: number }[];
  totalViews: number;
  topViewed: DocSummary[];
}

/** 관리자 대시보드용 문서 통계 계산 */
export function computeDocStats(docs: DocSummary[]): DocStats {
  const byStatus: Record<DocStatus, number> = { Published: 0, Draft: 0, Archived: 0 };
  const categories = new Map<string, number>();
  for (const d of docs) {
    byStatus[d.status] = (byStatus[d.status] ?? 0) + 1;
    categories.set(d.category, (categories.get(d.category) ?? 0) + 1);
  }
  return {
    total: docs.length,
    byStatus,
    byCategory: [...categories.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    totalViews: docs.reduce((sum, d) => sum + d.viewCount, 0),
    topViewed: [...docs].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5),
  };
}
