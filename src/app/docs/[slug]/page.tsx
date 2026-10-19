import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/docs/Markdown";
import { MetaInfo } from "@/components/docs/MetaInfo";
import { TagChip } from "@/components/docs/TagChip";
import { Toc } from "@/components/docs/Toc";
import { DocCard } from "@/components/docs/DocCard";
import { getDocBySlug, getPublishedDocs, getRelatedDocs } from "@/lib/notion";
import { extractToc } from "@/lib/toc";

// ISR: 30초마다 재검증 (lib/constants REVALIDATE_SECONDS와 동일, 세그먼트 설정은 리터럴만 허용)
export const revalidate = 30;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const docs = await getPublishedDocs();
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  return doc ? { title: doc.title, description: doc.summary } : { title: "문서를 찾을 수 없음" };
}

export default async function DocDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) notFound();

  const toc = extractToc(doc.markdown);
  const related = await getRelatedDocs(doc);

  return (
    <Container>
      <Link href="/docs" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> 문서 목록
      </Link>
      <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
        <article className="min-w-0 space-y-6">
          <header className="space-y-3 border-b pb-6">
            <div className="flex items-center gap-2">
              <Link href={`/category/${encodeURIComponent(doc.category)}`}>
                <Badge variant="secondary">{doc.category}</Badge>
              </Link>
              <Badge variant="outline">{doc.status}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
            {doc.summary && <p className="text-muted-foreground">{doc.summary}</p>}
            <MetaInfo doc={doc} />
            {doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {doc.tags.map((t) => (
                  <TagChip key={t} tag={t} />
                ))}
              </div>
            )}
          </header>
          <Markdown content={doc.markdown} />
          {related.length > 0 && (
            <section className="space-y-3 border-t pt-6">
              <h2 className="text-lg font-semibold">🔗 관련 문서</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <DocCard key={r.id} doc={r} />
                ))}
              </div>
            </section>
          )}
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Toc items={toc} />
          </div>
        </aside>
      </div>
    </Container>
  );
}
