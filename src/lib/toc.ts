import GithubSlugger from "github-slugger";
import type { TocItem } from "@/types/doc";

/** 마크다운에서 ##, ### 헤딩을 추출한다 (rehype-slug와 같은 id 규칙) */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{1,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    const id = slugger.slug(text);
    const level = m[1].length;
    if (level >= 2) items.push({ id, text, level: level as 2 | 3 });
  }
  return items;
}
