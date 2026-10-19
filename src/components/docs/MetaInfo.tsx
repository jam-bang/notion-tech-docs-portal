import { Calendar, Eye, GitBranch, User } from "lucide-react";
import type { DocSummary } from "@/types/doc";
import { formatDate } from "@/lib/utils";

export function MetaInfo({ doc, showViews = true }: { doc: DocSummary; showViews?: boolean }) {
  const author = doc.authors.map((a) => a.name).join(", ");
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <GitBranch className="size-3.5" />
        {doc.version}
      </span>
      {author && (
        <span className="inline-flex items-center gap-1">
          <User className="size-3.5" />
          {author}
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Calendar className="size-3.5" />
        {formatDate(doc.updatedDate)}
      </span>
      {showViews && (
        <span className="inline-flex items-center gap-1">
          <Eye className="size-3.5" />
          {doc.viewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
}
