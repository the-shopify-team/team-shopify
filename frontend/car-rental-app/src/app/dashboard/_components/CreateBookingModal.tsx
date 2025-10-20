"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Car from "@/components/svgs/car";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { adminCreateReservation } from "@/api/resource/dashboard";
import { getCar } from "@/api/resource/dashboard";
import { CarResponse } from "@/types/dashboard";
import { format as formatDate } from "date-fns";

const bookingFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username too short." })
      .max(20, { message: "Username too long." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      })
      .optional()
      .or(z.literal("")),
    car: z.string(),
    start_date: z.date().min(new Date(), "Start date must be in the future"),
    end_date: z.date(),
    status: z.enum(["soft", "firm", "expired", "completed", "deleted"]),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date && data.end_date <= data.start_date) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date",
        path: ["end_date"],
      });
    }
  });

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function CreateBookingModal() {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      email: "",
      username: "",
      car: "",
      start_date: new Date(),
      end_date: new Date(),
      status: "soft",
    },
  });

  const [availableCars, setAvailableCars] = useState<CarResponse[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  // const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoadingCars(true);
        const data = await getCar();
        setAvailableCars(data);
      } catch {
        toast.error("Failed to fetch cars");
      } finally {
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Convert Dates → "YYYY-MM-DD" strings
      const payload = {
        ...data,
        car: Number(data.car),
        start_date: formatDate(data.start_date, "yyyy-MM-dd"),
        end_date: formatDate(data.end_date, "yyyy-MM-dd"),
      };

      await adminCreateReservation(payload);
      toast.success("Reservation successful");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create reservation");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF9F1C] hover:bg-[#D17D18] font-semibold text-base">
          <Car />
          Create Reservation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Reservation</DialogTitle>
          <DialogDescription>Fill in the reservation details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        className="placeholder:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter username"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* <FormField
                control={form.control}
                name="car"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select car"
                            className="placeholder:text-xs"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="car"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select car" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loadingCars ? (
                          <SelectItem
                            value="loading"
                            disabled
                          >
                            Loading cars...
                          </SelectItem>
                        ) : availableCars.length > 0 ? (
                          availableCars.map((car) => (
                            <SelectItem
                              key={car.id}
                              value={String(car.id)}
                            >
                              {car.model}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem
                            value="none"
                            disabled
                          >
                            No available cars
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select status"
                            className="placeholder:text-xs"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="soft">Soft</SelectItem>
                        <SelectItem value="firm">Firm</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) => {
                            const start_date = form.getValues("start_date");
                            return !start_date || date < start_date;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
                className={cn(
                  form.formState.isSubmitting
                    ? "bg-[#FF9F1C]/70 cursor-not-allowed"
                    : "bg-[#FF9F1C] hover:bg-[#D17D18] cursor-pointer"
                )}
              >
                {form.formState.isSubmitting ? "Booking..." : "Create Reservation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
