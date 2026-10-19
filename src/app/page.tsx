import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/docs/CategoryBadge";
import { DocGrid } from "@/components/docs/DocGrid";
import { NotionSetupNotice } from "@/components/docs/NotionSetupNotice";
import { HomeSearch } from "@/components/docs/HomeSearch";
import { getCategories, getPublishedDocs, isNotionConfigured } from "@/lib/notion";
import { HOME_RECENT_COUNT, SITE_DESCRIPTION } from "@/lib/constants";

// ISR: 30초마다 재검증 (lib/constants REVALIDATE_SECONDS와 동일, 세그먼트 설정은 리터럴만 허용)
export const revalidate = 30;

export default async function HomePage() {
  const [docs, categories] = await Promise.all([getPublishedDocs(), getCategories()]);
  const recent = docs.slice(0, HOME_RECENT_COUNT);

  return (
    <Container className="space-y-10">
      <section className="space-y-4 pt-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">기술 문서 포탈</h1>
        <p className="text-muted-foreground">{SITE_DESCRIPTION}</p>
        <HomeSearch />
      </section>

      {!isNotionConfigured() ? (
        <NotionSetupNotice />
      ) : (
        <>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">📌 카테고리</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <CategoryBadge key={c.name} name={c.name} count={c.count} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">📚 최근 문서</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/docs">
                  전체 보기 <ArrowRight />
                </Link>
              </Button>
            </div>
            <DocGrid docs={recent} emptyMessage="발행된 문서가 아직 없습니다." />
          </section>
        </>
      )}
    </Container>
  );
}
