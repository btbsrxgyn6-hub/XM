import { Container } from "@/components/atoms/container";
import { PublicHeader } from "@/components/organisms/public-header";

export function PublicLayout({
  children,
  container = true,
  showHeader = true
}: {
  children: React.ReactNode;
  container?: boolean;
  showHeader?: boolean;
}) {
  return (
    <div className="min-h-screen bg-surface">
      {showHeader ? <PublicHeader /> : null}
      {container ? (
        <main className="pb-16 pt-8">
          <Container>{children}</Container>
        </main>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
