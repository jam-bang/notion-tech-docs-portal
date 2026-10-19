import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { DocGrid } from "@/components/docs/DocGrid";
import { Pagination } from "@/components/docs/Pagination";
import { NotionSetupNotice } from "@/components/docs/NotionSetupNotice";
import { getPublishedDocs, isNotionConfigured } from "@/lib/notion";
import { DOCS_PER_PAGE } from "@/lib/constants";

// ISR: 30초마다 재검증 (lib/constants REVALIDATE_SECONDS와 동일, 세그먼트 설정은 리터럴만 허용)
export const revalidate = 30;
export const metadata: Metadata = { title: "전체 문서" };

export default async function DocsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const docs = await getPublishedDocs();
  const totalPages = Math.max(1, Math.ceil(docs.length / DOCS_PER_PAGE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const items = docs.slice((page - 1) * DOCS_PER_PAGE, page * DOCS_PER_PAGE);

  return (
    <Container className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">전체 문서</h1>
        <p className="text-sm text-muted-foreground">최근 수정순 · 총 {docs.length}건</p>
      </div>
      {isNotionConfigured() ? <DocGrid docs={items} /> : <NotionSetupNotice />}
      <Pagination page={page} totalPages={totalPages} basePath="/docs" />
    </Container>
  );
}
