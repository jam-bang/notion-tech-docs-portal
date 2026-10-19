import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CategoryBadge } from "@/components/docs/CategoryBadge";
import { DocGrid } from "@/components/docs/DocGrid";
import { getCategories, getDocsByCategory } from "@/lib/notion";

// ISR: 30초마다 재검증 (lib/constants REVALIDATE_SECONDS와 동일, 세그먼트 설정은 리터럴만 허용)
export const revalidate = 30;

type Props = { params: Promise<{ name: string }> };

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  return { title: `${decodeURIComponent(name)} 문서` };
}

export default async function CategoryPage({ params }: Props) {
  const { name } = await params;
  const category = decodeURIComponent(name);
  const [docs, categories] = await Promise.all([getDocsByCategory(category), getCategories()]);

  return (
    <Container className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">
          {category} 문서 <span className="text-muted-foreground">({docs.length}개)</span>
        </h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <CategoryBadge key={c.name} name={c.name} count={c.count} />
          ))}
        </div>
      </div>
      <DocGrid docs={docs} emptyMessage="이 카테고리에 발행된 문서가 없습니다." />
    </Container>
  );
}
