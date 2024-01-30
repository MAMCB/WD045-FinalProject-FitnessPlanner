import React from "react";
import HeroSection from "./HeroSection";
import PresentationSection from "./PresentationSection";
import OfferSection from "./OfferSection";
import TestimonialsSection from "./TestimonialsSection";
import NavbarForHome from "../NavbarForHome";
const LandingPage = () => {
  return (
    <main>
    <NavbarForHome/>
   <HeroSection/>
   <PresentationSection/>
   <OfferSection />
   <TestimonialsSection/>
   </main>
  );
};

export default LandingPage;
