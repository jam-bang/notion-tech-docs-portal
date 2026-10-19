import { Container } from "@/components/layout/Container";
import { DocGridSkeleton, Skeleton } from "@/components/docs/Skeleton";

export default function Loading() {
  return (
    <Container className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <DocGridSkeleton />
    </Container>
  );
}
