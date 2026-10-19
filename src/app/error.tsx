"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/docs/EmptyState";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="space-y-4">
      <EmptyState title="문서를 불러오지 못했습니다." description={error.message} />
      <div className="text-center">
        <Button variant="outline" onClick={reset}>
          다시 시도
        </Button>
      </div>
    </Container>
  );
}
