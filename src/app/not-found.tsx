import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/docs/EmptyState";

export default function NotFound() {
  return (
    <Container className="space-y-4">
      <EmptyState title="페이지를 찾을 수 없습니다." description="문서가 삭제되었거나 주소가 잘못되었습니다." />
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </Container>
  );
}
