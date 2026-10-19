import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Author, DocStatus, DocSummary } from "@/types/doc";

type Prop = PageObjectResponse["properties"][string];

function getProp(page: PageObjectResponse, name: string): Prop | undefined {
  return page.properties[name];
}

function plainText(prop: Prop | undefined): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "status") return prop.status?.name ?? "";
  return "";
}

/** 제목 속성은 이름과 무관하게 title 타입을 찾는다 */
function titleOf(page: PageObjectResponse): string {
  const titleProp = Object.values(page.properties).find((p) => p.type === "title");
  return plainText(titleProp) || "제목 없음";
}

function dateOf(prop: Prop | undefined): string | null {
  return prop?.type === "date" ? (prop.date?.start ?? null) : null;
}

function authorsOf(prop: Prop | undefined): Author[] {
  if (prop?.type !== "people") return [];
  return prop.people.map((p) => ({
    name: "name" in p && p.name ? p.name : "알 수 없음",
    avatarUrl: "avatar_url" in p && p.avatar_url ? p.avatar_url : undefined,
  }));
}

/** 제목으로 slug 생성 (Slug 속성이 비어 있을 때 대비) */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

/** Notion 페이지 → 도메인 타입 변환 */
export function toDocSummary(page: PageObjectResponse): DocSummary {
  const title = titleOf(page);
  const tagsProp = getProp(page, "Tags");
  const viewProp = getProp(page, "ViewCount");
  const relatedProp = getProp(page, "RelatedDocs");

  return {
    id: page.id,
    title,
    slug: plainText(getProp(page, "Slug")) || slugify(title),
    category: plainText(getProp(page, "Category")) || "Uncategorized",
    tags: tagsProp?.type === "multi_select" ? tagsProp.multi_select.map((t) => t.name) : [],
    version: plainText(getProp(page, "Version")) || "v1.0",
    status: (plainText(getProp(page, "Status")) || "Draft") as DocStatus,
    summary: plainText(getProp(page, "Summary")),
    authors: authorsOf(getProp(page, "Author")),
    publishedDate: dateOf(getProp(page, "PublishedDate")),
    updatedDate: dateOf(getProp(page, "UpdatedDate")) ?? page.last_edited_time,
    viewCount: viewProp?.type === "number" ? (viewProp.number ?? 0) : 0,
    relatedDocIds: relatedProp?.type === "relation" ? relatedProp.relation.map((r) => r.id) : [],
  };
}
