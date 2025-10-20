"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CarResponse } from "@/types/dashboard";
import { getCar, reserveCar } from "@/api/resource/dashboard";
import { toast } from "sonner";

const Car: React.FC<CarCardProps> = () => {
  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedCar, setSelectedCar] = useState<CarResponse | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCar();
        setCars(data);
      } catch {
        toast.error("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleReserveCar = async (id: number) => {
    const loadingToast = toast.loading("Reserving car...");
    try {
      const result = await reserveCar(id);
      setCars((prev) => prev.filter((car) => car.id !== id));
      toast.success(result.message || "Car successfully reserved");
    } catch {
      toast.error("Failed to reserve car");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-muted-foreground text-lg">
        Loading cars...
      </p>
    );

  return (
    <div className="px-6 pb-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Browse Available Cars</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Find the perfect ride for your next trip — affordable, reliable, and ready when you are.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onReserve={() => handleReserveCar(car.id)} />
        ))}

        {!cars.length && (
          <div className="col-span-full text-center py-8 text-muted-foreground text-lg">
            No cars available.
          </div>
        )}
      </div>
    </div>
  );
};

interface CarCardProps {
  car: CarResponse;
  onReserve: () => void;
}

const CarCard = ({ car, onReserve }: CarCardProps) => {
  const [open, setOpen] = useState(false);
  const title = `${car.make} ${car.model}`;
  const rent = car.price ?? 0;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 group max-w-sm mx-auto">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-right">
          <div className="text-2xl font-extrabold">₦{rent.toLocaleString()}</div>
          <div className="text-sm text-gray-500">/day</div>
        </div>
      </div>

      <div className="relative w-full h-40 my-4">
        <Image
          src={
            Array.isArray(car.images_url) && car.images_url.length > 0
              ? car.images_url[0]
              : "/images/car-hero.png"
          }
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
          <Image src="/tire.svg" alt="drive" width={18} height={18} />
          <span className="mt-1">{(car.fuel_type ?? "FWD").toString().toUpperCase()}</span>
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
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
                  src={
                    Array.isArray(car.images_url) && car.images_url.length > 0
                      ? car.images_url[0]
                      : "/images/car-hero.png"
                  }
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
                  <strong>Fuel:</strong> {car.fuel_type ?? "N/A"}
                </li>
                <li>
                  <strong>Category:</strong> {car.category ?? "N/A"}
                </li>
                <li>
                  <strong>Price/day:</strong> ₦{rent.toLocaleString()}
                </li>
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 cursor-pointer py-3 rounded-md border border-gray-200 text-gray-700">
                  Close
                </button>
              </Dialog.Close>
              <button
                onClick={onReserve}
                className="flex-1 cursor-pointer py-3 rounded-md bg-[#FF9F1C] text-white hover:opacity-95"
              >
                Reserve
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Car;
