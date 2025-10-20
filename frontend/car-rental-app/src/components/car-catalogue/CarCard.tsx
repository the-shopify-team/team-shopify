"use client";

import Image from "next/image";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";

type Car = {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  transmission: "Automatic" | "Manual" | string;
  fuel?: string;
  city_mpg: number;
  daily_price: number;
  image?: string;
  description?: string;
};

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const [open, setOpen] = useState(false);

  const rent = car.daily_price ?? 0;
  const title = `${car.manufacturer} ${car.model}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 group max-w-sm mx-auto">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-right">
          <div className="text-2xl font-extrabold">${rent}</div>
          <div className="text-sm text-gray-500">/day</div>
        </div>
      </div>

      <div className="relative w-full h-40 my-4">
        <Image
          src={car.image ?? "/images/car-hero.png"}
          alt={title}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div className="flex flex-col items-center">
          <Image
            src="/steering-wheel.svg"
            alt="transmission"
            width={18}
            height={18}
          />
          <span className="mt-1">{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/tire.svg"
            alt="drive"
            width={18}
            height={18}
          />
          <span className="mt-1">{(car.fuel ?? "FWD").toString().toUpperCase()}</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/gas.svg"
            alt="mpg"
            width={18}
            height={18}
          />
          <span className="mt-1">{car.city_mpg} MPG</span>
        </div>
      </div>

      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
      >
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="w-full cursor-pointer py-3 rounded-lg bg-[#FF9F1C] text-white font-semibold hover:opacity-95 transition"
          >
            View Details
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 max-w-lg w-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">
                {title} — {car.year}
              </h4>
              <Dialog.Close asChild>
                <button
                  aria-label="Close"
                  className="text-gray-500 cursor-pointer hover:text-gray-800"
                >
                  ✕
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-4">
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={car.image ?? "/images/car-hero.png"}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-sm text-gray-700 mb-3">
                {car.description ?? "No description available."}
              </p>

              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <strong>Transmission:</strong> {car.transmission}
                </li>
                <li>
                  <strong>Fuel:</strong> {car.fuel ?? "N/A"}
                </li>
                <li>
                  <strong>City MPG:</strong> {car.city_mpg}
                </li>
                <li>
                  <strong>Price/day:</strong> ${rent}
                </li>
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 cursor-pointer py-3 rounded-md border border-gray-200 text-gray-700">
                  Close
                </button>
              </Dialog.Close>
              <button className="flex-1 cursor-pointer py-3 rounded-md bg-[#FF9F1C] text-white">
                Reserve
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CarCard;
