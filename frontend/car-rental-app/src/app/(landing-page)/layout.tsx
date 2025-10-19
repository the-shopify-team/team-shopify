import { Footer } from "@/components/Footer";
import NavBar from "@/components/Navbar";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main className="relative">
          <NavBar />
            {children}
          <Footer />
        </main>
    </div>
  );
}
