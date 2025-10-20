import BrowseCar from "@/components/car-catalogue/BrowseCar";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { HowItWork } from "@/components/landing-page/HowItWork";

export default function LandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <HowItWork />
      <BrowseCar />
    </div>
  );
}
