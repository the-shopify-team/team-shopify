"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Eye } from "lucide-react";
import { CarResponse } from "@/types/dashboard";
import { toast } from "sonner";
import { reserveCar, getCar } from "@/api/resource/dashboard";

const Cars = () => {
  const [cars, setCars] = useState<CarResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<CarResponse | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

    const loadingToast = toast.loading("reserving car...");
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

  const handleCarDetails = (car: CarResponse) => {
    setSelectedCar(car);
    setDetailsOpen(true);
  };

  if (loading)
    return <p className="text-center py-10 text-muted-foreground text-lg">Loading cars...</p>;
  return (
    <div className="px-7">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-10">Manage Cars</h2>
        
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Card
            key={car.id}
            className="shadow-md border rounded-xl overflow-hidden"
          >
            <Image
              src={
                Array.isArray(car.images_url) && car.images_url.length > 0
                  ? car.images_url[0]
                  : "/images/auth-image.png"
              }
              alt={`${car.make} ${car.model}`}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {car.make} {car.model}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                ₦{parseFloat(car.price).toLocaleString()}
              </p>
              <p
                className={`text-xs font-medium ${
                  car.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {car.available ? "Available" : "Unavailable"}
              </p>
            </CardHeader>
            <CardContent className="flex justify-between mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCarDetails(car)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" /> Details
              </Button>
              <Button
                size="sm"
                onClick={() => handleReserveCar(car.id)}
                className="flex items-center gap-2 bg-[#FF9F1C] cursor-pointer"
              >
                Reserve
              </Button>
            </CardContent>
          </Card>
        ))}
        {!cars.length && (
          <div className="col-span-full text-center py-8 text-muted-foreground text-lg">
            No cars added yet.
          </div>
        )}
        {/* Dialog Details*/}
        <Dialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        >
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            {selectedCar && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {selectedCar.make} {selectedCar.model}
                  </DialogTitle>
                  <DialogDescription>Full car details</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <Image
                    src={
                      Array.isArray(selectedCar.images_url) && selectedCar.images_url.length > 0
                        ? selectedCar.images_url[0]
                        : "/images/auth-image.png"
                    }
                    alt={`${selectedCar.make} image`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Separator className="my-3" />
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-bold pr-1">Make:</span> {selectedCar.make}
                    </p>
                    <p>
                      <span className="font-bold pr-1">Model:</span> {selectedCar.model}
                    </p>
                    <p>
                      <span className="font-bold pr-1">Price:</span> ₦
                      {parseFloat(selectedCar.price).toLocaleString()}
                    </p>
                    {selectedCar.color && (
                      <p>
                        <span className="font-bold pr-1">Color:</span> {selectedCar.color}
                      </p>
                    )}
                    {selectedCar.fuel_type && (
                      <p>
                        <span className="font-bold pr-1">Fuel Type:</span> {selectedCar.fuel_type}
                      </p>
                    )}
                    {selectedCar.transmission && (
                      <p>
                        <span className="font-bold pr-1">Transmission:</span>{" "}
                        {selectedCar.transmission}
                      </p>
                    )}
                    {selectedCar.category && (
                      <p>
                        <span className="font-bold pr-1">Category:</span> {selectedCar.category}
                      </p>
                    )}

                    {selectedCar.description && (
                      <p>
                        <span className="font-bold pr-1">Rules:</span> {selectedCar.description}
                      </p>
                    )}

                    {selectedCar.added_at && (
                      <p>
                        <span className="font-bold pr-1">Added On:</span>
                        {new Date(selectedCar.added_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    <p>
                      <span className="font-bold pr-1">Status:</span>
                      <span
                        className={`${selectedCar.available ? "text-green-600" : "text-red-500"}`}
                      >
                        {selectedCar.available ? "Available" : "Unavailable"}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        ;
      </div>
    </div>
  );
};

export default Cars;
