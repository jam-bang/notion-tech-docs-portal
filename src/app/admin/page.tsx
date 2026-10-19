import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotionSetupNotice } from "@/components/docs/NotionSetupNotice";
import { getAllDocs, isNotionConfigured } from "@/lib/notion";
import { computeDocStats } from "@/lib/stats";
import { formatDate } from "@/lib/utils";

// ISR: 30초마다 재검증
export const revalidate = 30;
export const metadata: Metadata = { title: "관리자 · 문서 현황", robots: { index: false, follow: false } };

const STATUS_LABEL = { Published: "발행", Draft: "초안", Archived: "보관" } as const;

/** 관리자 문서 현황 대시보드 (읽기 전용 MVP) */
export default async function AdminPage() {
  if (!isNotionConfigured()) {
    return (
      <Container>
        <NotionSetupNotice />
      </Container>
    );
  }

  const docs = await getAllDocs();
  const stats = computeDocStats(docs);
  const recent = docs.slice(0, 10);

  const tiles = [
    { label: "전체 문서", value: stats.total },
    { label: "발행", value: stats.byStatus.Published },
    { label: "초안", value: stats.byStatus.Draft },
    { label: "총 조회수", value: stats.totalViews.toLocaleString() },
  ];

  return (
    <Container className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">관리자 · 문서 현황</h1>
        <p className="text-sm text-muted-foreground">Notion 데이터베이스 기준 · 30초마다 갱신 · 문서 편집은 Notion에서</p>
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {tiles.map((t) => (
          <Card key={t.label}>
            <CardHeader>
              <CardDescription>{t.label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{t.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 문서</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {stats.byCategory.map((c) => (
                <li key={c.name} className="flex justify-between">
                  <span>{c.name}</span>
                  <span className="tabular-nums text-muted-foreground">{c.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>조회수 Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm">
              {stats.topViewed.map((d, i) => (
                <li key={d.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {i + 1}. {d.title}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{d.viewCount.toLocaleString()}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 수정 문서</CardTitle>
          <CardDescription>상태와 관계없이 최근 수정순 10건</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 pr-3 font-medium">제목</th>
                <th className="py-2 pr-3 font-medium">카테고리</th>
                <th className="py-2 pr-3 font-medium">상태</th>
                <th className="py-2 pr-3 font-medium">수정일</th>
                <th className="py-2 font-medium">편집</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((d) => (
                <tr key={d.id} className="border-b last:border-0">
                  <td className="py-2 pr-3">
                    {d.status === "Published" ? (
                      <Link href={`/docs/${encodeURIComponent(d.slug)}`} className="hover:underline">
                        {d.title}
                      </Link>
                    ) : (
                      d.title
                    )}
                  </td>
                  <td className="py-2 pr-3">{d.category}</td>
                  <td className="py-2 pr-3">
                    <Badge variant={d.status === "Published" ? "default" : "outline"}>{STATUS_LABEL[d.status] ?? d.status}</Badge>
                  </td>
                  <td className="py-2 pr-3 tabular-nums">{formatDate(d.updatedDate)}</td>
                  <td className="py-2">
                    <a
                      href={d.notionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Notion <ExternalLink className="size-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Container>
  );
}
