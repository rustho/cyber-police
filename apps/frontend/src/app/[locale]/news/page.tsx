import { News } from "@/components/Landing";
import { Header } from "@/components/Landing/Header";
import { Footer } from "@/components/Landing/Footer";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <News />
      <Footer />
    </div>
  );
}
