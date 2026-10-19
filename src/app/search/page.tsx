import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { SearchView } from "@/components/docs/SearchView";
import { DocGridSkeleton } from "@/components/docs/Skeleton";
import { getPublishedDocs } from "@/lib/notion";

// ISR: 30초마다 재검증 (lib/constants REVALIDATE_SECONDS와 동일, 세그먼트 설정은 리터럴만 허용)
export const revalidate = 30;
export const metadata: Metadata = { title: "검색" };

export default async function SearchPage() {
  const docs = await getPublishedDocs();
  return (
    <Container className="space-y-6">
      <h1 className="text-2xl font-bold">🔍 문서 검색</h1>
      <Suspense fallback={<DocGridSkeleton />}>
        <SearchView docs={docs} />
      </Suspense>
    </Container>
  );
}
