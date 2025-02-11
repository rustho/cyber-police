import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { Features } from "./Features";
import { Screenshots } from "./Screenshots";
import { CTA } from "./CTA";
import { FAQ } from "./FAQ";
import { Team } from "./Team";
import { Footer } from "./Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        {/* <Features /> */}
        <Screenshots />
        <FAQ />
        <Team />
        <CTA />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
