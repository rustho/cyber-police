import { LandingPage } from "@/components/Landing";
import { Header } from "@/components/Landing/Header";
import { Footer } from "@/components/Landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
