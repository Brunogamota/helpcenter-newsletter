import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AjudaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </>
  );
}
