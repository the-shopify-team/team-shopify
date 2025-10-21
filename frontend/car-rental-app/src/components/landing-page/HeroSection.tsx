import Image from "next/image";
// import CarSearchForm from "./CarSearchForm";

export const HeroSection = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-8xl mx-auto  pt-10 sm:pt-24">
      <div className="xl:flex-[0.7] flex-1 py-10 sm:py-32 px-4 sm:px-6 lg:px-0 lg:ml-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight w-[80%]">
          Rent a Comfortable Car With Ease
        </h1>
        <p className="pt-5 w-[80%]">
          Find the perfect ride for your next trip, affordable, reliable, and just a few clicks
          away. Whether you’re heading out for a weekend getaway, a business trip, or simply need a
          smooth daily drive, we make renting a car effortless. Choose from a wide range of
          vehicles, compare prices instantly, and enjoy a seamless booking experience from start to
          finish.
        </p>
      </div>
      <div className="xl:flex-[0.7] flex justify-center xl:justify-end items-center w-full">
        <div className="relative w-full max-w-md xl:max-w-none xl:w-full h-[250px] sm:h-[350px] md:h-[450px] xl:h-full z-0">
          <Image
            src="/images/car-hero.png"
            alt="hero"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};
