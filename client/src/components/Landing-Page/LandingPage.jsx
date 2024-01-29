import React from "react";
import HeroSection from "./HeroSection";
import PresentationSection from "./PresentationSection";
import OfferSection from "./OfferSection";
import TestimonialsSection from "./TestimonialsSection";

const LandingPage = () => {
  return (
   <main>
   <HeroSection/>
   <PresentationSection/>
   <OfferSection />
   <TestimonialsSection/>
   </main>
  );
};

export default LandingPage;
