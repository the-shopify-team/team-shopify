import Image from "next/image";
import CarSearchForm from "./CarSearchForm";

export const HeroSection = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-8xl mx-auto  pt-10 sm:pt-20">
      <div className="xl:flex-[0.7] flex-1 py-10 sm:py-20 px-4 sm:px-6 lg:px-0 lg:ml-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight w-[80%]">
          Rent a Comfortable Car With Ease
        </h1>

        <CarSearchForm />
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
