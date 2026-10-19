import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** 홈 검색창 — /search 페이지로 이동 */
export function HomeSearch() {
  return (
    <form action="/search" className="flex max-w-xl gap-2" role="search">
      <Input name="q" placeholder="문서 검색 (예: 성능, Oracle)" aria-label="문서 검색" />
      <Button type="submit">
        <Search /> 검색
      </Button>
    </form>
  );
}
