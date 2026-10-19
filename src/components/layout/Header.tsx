import Link from "next/link";
import { BookOpen, Search } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/docs", label: "전체 문서" },
  { href: "/search", label: "검색" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="size-5 text-primary" />
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {item.href === "/search" ? <Search className="size-4 sm:hidden" aria-label="검색" /> : null}
              <span className={item.href === "/search" ? "hidden sm:inline" : ""}>{item.label}</span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
