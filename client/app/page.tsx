import HeroSection from "./components/HeroSection";
import TrustedMpSect from "./components/TrustedMpSect";
import TractorListings from "./components/TractorListings";
import TractorDealers from "./components/TractorDealers";
import Testimonials from "./components/Testimonials";
import Inquiries from "./components/Inquiries";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <main>
        <TrustedMpSect />
        <TractorListings />
        <TractorDealers />
        <Testimonials />
        <Inquiries />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
