"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/constants";

export default function CarModel() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-40">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Rent by Brands</h2>
        <Link href="#" className="text-sm text-gray-600 hover:text-black flex items-center gap-1 self-start sm:self-auto">
          View all →
        </Link>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer min-h-[120px] sm:min-h-[140px]"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-12 lg:h-12 mb-2 sm:mb-3">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-800 text-center">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
