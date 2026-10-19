import Link from "next/link";
import type { DocSummary } from "@/types/doc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaInfo } from "./MetaInfo";
import { TagChip } from "./TagChip";

export function DocCard({ doc }: { doc: DocSummary }) {
  return (
    <Link href={`/docs/${encodeURIComponent(doc.slug)}`} className="group block h-full">
      <Card className="h-full transition-colors group-hover:border-primary/60">
        <CardHeader>
          <Badge variant="outline" className="w-fit">
            {doc.category}
          </Badge>
          <CardTitle className="text-lg group-hover:text-primary">{doc.title}</CardTitle>
          {doc.summary && <CardDescription className="line-clamp-2">{doc.summary}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-3">
          {doc.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {doc.tags.map((t) => (
                <TagChip key={t} tag={t} />
              ))}
            </div>
          )}
          <MetaInfo doc={doc} />
        </CardContent>
      </Card>
    </Link>
  );
}
