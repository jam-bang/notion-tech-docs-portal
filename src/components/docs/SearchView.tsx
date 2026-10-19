"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DocSummary } from "@/types/doc";
import { Input } from "@/components/ui/input";
import { DocGrid } from "./DocGrid";
import { TagChip } from "./TagChip";

/** 클라이언트 사이드 전체 검색 + 카테고리/태그 필터 */
export function SearchView({ docs }: { docs: DocSummary[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string>("all");
  const [tags, setTags] = useState<string[]>([]);

  const categories = useMemo(() => [...new Set(docs.map((d) => d.category))].sort(), [docs]);
  const allTags = useMemo(() => [...new Set(docs.flatMap((d) => d.tags))].sort(), [docs]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (tags.length && !tags.every((t) => d.tags.includes(t))) return false;
      if (!q) return true;
      return [d.title, d.summary, d.category, ...d.tags].some((v) => v.toLowerCase().includes(q));
    });
  }, [docs, query, category, tags]);

  const toggleTag = (t: string) => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div className="space-y-6">
      <Input
        type="search"
        autoFocus
        placeholder="제목, 요약, 태그로 검색"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          router.replace(`/search?q=${encodeURIComponent(e.target.value)}`, { scroll: false });
        }}
        aria-label="문서 검색"
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label htmlFor="category" className="text-muted-foreground">
          카테고리
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-8 rounded-md border bg-background px-2"
        >
          <option value="all">전체</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <TagChip key={t} tag={t} active={tags.includes(t)} onClick={() => toggleTag(t)} />
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground">검색 결과 {results.length}건</p>
      <DocGrid docs={results} emptyMessage="조건에 맞는 문서가 없습니다." />
    </div>
  );
}
