/** 문서 상태 (Notion Status 속성) */
export type DocStatus = "Draft" | "Published" | "Archived";

export interface Author {
  name: string;
  avatarUrl?: string;
}

/** 목록/카드에서 사용하는 문서 요약 */
export interface DocSummary {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  version: string;
  status: DocStatus;
  summary: string;
  authors: Author[];
  publishedDate: string | null;
  updatedDate: string | null;
  viewCount: number;
  relatedDocIds: string[];
  /** Notion 원본 페이지 URL (관리자 편집 링크용) */
  notionUrl: string;
}

/** 상세 페이지용 문서 (본문 마크다운 포함) */
export interface Doc extends DocSummary {
  markdown: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}
