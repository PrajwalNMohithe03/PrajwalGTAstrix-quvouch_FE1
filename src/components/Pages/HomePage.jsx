import Hero from "../Herosection/HeroSection";
import Stats from "../Stats";
import Features from "../Feature";
import HowItWorks from  "../Howitworks";
import Testimonials from "../Reviews";
import Pricing from "../PricingPage";
import CTA from "../CTAsections";
function Home() {
  return (
   
<div>

      <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
        
    </div>
  );
}

export default Home;
