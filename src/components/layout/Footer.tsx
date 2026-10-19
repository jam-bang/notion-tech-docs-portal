import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {SITE_NAME} · Powered by Notion & Next.js
        </span>
        <Link href="/admin" className="hover:text-foreground">
          관리자
        </Link>
      </div>
    </footer>
  );
}
