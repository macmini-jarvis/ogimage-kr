import { LandingHeader } from "./header";
import { Footer } from "./footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <LandingHeader />
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
