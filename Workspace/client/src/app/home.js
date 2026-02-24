import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import Hero from "../components/Hero/Hero";
import TrustBar from "../components/TrustBar/TrustBar";
import ProcessFlow from "../components/ProcessFlow/ProcessFlow";
import Services from "../Section/Services/Services";
import PricingCalculator from "../Section/PricingCalculator/PricingCalculator";
import JoinTeam from "../Section/JoinTeam/JoinTeam";

export default function HomePage() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <ProcessFlow />
        <PricingCalculator />
        <JoinTeam />
      </main>
      <Footer />
    </div>
  );
}
