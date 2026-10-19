import "server-only";
import { cache } from "react";
import { isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { Category, Doc, DocSummary } from "@/types/doc";
import { getDatabaseId, getNotionClient, isNotionConfigured } from "./client";
import { toDocSummary } from "./mapper";

/**
 * 발행(Published)된 문서 전체를 최근 수정순으로 조회한다.
 * (Status 속성이 select·status 어느 타입이어도 동작)
 * Notion 미설정 시 빈 배열을 반환해 빌드가 깨지지 않게 한다.
 */
export const getPublishedDocs = cache(async (): Promise<DocSummary[]> => {
  if (!isNotionConfigured()) return [];
  const notion = getNotionClient();
  const docs: DocSummary[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.databases.query({
      database_id: getDatabaseId(),
      sorts: [{ timestamp: "last_edited_time", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });
    for (const page of res.results) {
      if (!isFullPage(page)) continue;
      const doc = toDocSummary(page);
      // Status는 select/status 타입 모두 지원하기 위해 API 필터 대신 코드에서 거른다
      if (doc.status === "Published") docs.push(doc);
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return docs.sort((a, b) => (b.updatedDate ?? "").localeCompare(a.updatedDate ?? ""));
});

/** slug로 문서 1건 + 본문 마크다운 조회 */
export const getDocBySlug = cache(async (slug: string): Promise<Doc | null> => {
  const docs = await getPublishedDocs();
  const summary = docs.find((d) => d.slug === decodeURIComponent(slug));
  if (!summary) return null;

  const n2m = new NotionToMarkdown({ notionClient: getNotionClient() });
  const blocks = await n2m.pageToMarkdown(summary.id);
  const markdown = n2m.toMarkdownString(blocks).parent ?? "";

  return { ...summary, markdown };
});

/** 카테고리별 문서 수 (문서 많은 순) */
export const getCategories = cache(async (): Promise<Category[]> => {
  const docs = await getPublishedDocs();
  const counts = new Map<string, number>();
  for (const d of docs) counts.set(d.category, (counts.get(d.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
});

/** 카테고리에 속한 문서 */
export async function getDocsByCategory(category: string): Promise<DocSummary[]> {
  const docs = await getPublishedDocs();
  return docs.filter((d) => d.category.toLowerCase() === decodeURIComponent(category).toLowerCase());
}

/** 관련 문서 (RelatedDocs 관계형) */
export async function getRelatedDocs(doc: DocSummary): Promise<DocSummary[]> {
  if (doc.relatedDocIds.length === 0) return [];
  const docs = await getPublishedDocs();
  const ids = new Set(doc.relatedDocIds.map((id) => id.replace(/-/g, "")));
  return docs.filter((d) => ids.has(d.id.replace(/-/g, "")));
}
