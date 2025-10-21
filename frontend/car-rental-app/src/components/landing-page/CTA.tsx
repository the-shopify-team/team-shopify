import Image from "next/image";
import React from "react";

export const CTA = () => {
  return (
    <div className="flex xl:flex-row flex-col gap-0 relative z-0 max-w-[1440px] mx-auto py-10 sm:py-20 bg-[#66400B] px-4 sm:px-6 lg:px-10">
      <div className="flex-1 py-10 sm:py-20 px-4 sm:px-6 lg:px-16 text-white">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-8xl font-extrabold leading-tight max-w-full">
          Best Offer
        </h1>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold pt-3 sm:pt-5">
          Range Rover
        </h2>

        <p className="text-lg sm:text-2xl lg:text-3xl font-light pt-4 sm:pt-8">For $500/day</p>

        <button className="bg-white text-black rounded-xl min-w-[119px] px-4 py-2 mt-6 sm:mt-10 hover:bg-gray-100 transition-colors">
          Explore Cars
        </button>
      </div>
      <div className="xl:flex-[1.5] flex justify-center xl:justify-end items-end w-full">
        <div className="relative w-full max-w-md xl:max-w-none xl:w-full h-[250px] sm:h-[350px] md:h-[450px] xl:h-full z-0">
          <Image
            src="/images/cta-car.png"
            alt="hero"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
