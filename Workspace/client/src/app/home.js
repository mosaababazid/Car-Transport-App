import dynamic from "next/dynamic";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Gallery from "../Section/Gallery/Gallery";
import TrustBar from "../components/TrustBar/TrustBar";
import Services from "../Section/Services/Services";

const ProcessFlow = dynamic(() => import("../components/ProcessFlow/ProcessFlow"), {
  loading: () => <div aria-hidden="true" style={{ minHeight: "34rem" }} />,
});
const PricingCalculator = dynamic(() => import("../Section/PricingCalculator/PricingCalculator"), {
  loading: () => <div aria-hidden="true" style={{ minHeight: "24rem" }} />,
});
const JoinTeam = dynamic(() => import("../Section/JoinTeam/JoinTeam"), {
  loading: () => <div aria-hidden="true" style={{ minHeight: "20rem" }} />,
});

export default function HomePage() {
  return (
    <div className="app-shell">
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <ProcessFlow />
        <Gallery />
        <PricingCalculator />
        <JoinTeam />
      </main>
      <Footer />
    </div>
  );
}
