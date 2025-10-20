import BrowseCar from "@/components/car-catalogue/BrowseCar";
import CarModel from "@/components/landing-page/CarModel";
import { CTA } from "@/components/landing-page/CTA";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { HowItWork } from "@/components/landing-page/HowItWork";

export default function LandingPage() {
  return (
    <div className="relative">
      <HeroSection />
      <HowItWork />
      <BrowseCar searchParams={{} as any} />
    </div>
  );
}
