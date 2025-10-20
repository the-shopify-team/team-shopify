"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { addCarUrl, editCarUrl } from "@/api/resource/dashboard";
import Image from "next/image";
import * as z from "zod";
import Car from "@/components/svgs/car";
import { cn } from "@/lib/utils";

const carFormSchema = z.object({
  make: z
    .string()
    .min(1, "Make is required")
    .regex(/^[A-Za-z\s-]+$/, "Only letters, spaces, and hyphens allowed"),
  model: z
    .string()
    .min(1, "Model is required")
    .regex(/^[A-Za-z0-9\s-]+$/, "Only letters, numbers, spaces, and hyphens allowed"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.enum(["Sedan", "SUV", "Convertible", "Super car"]),
  available: z.boolean(),
  images_url: z.any(),
  color: z.string().regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed"),
  transmission: z.enum(["automatic", "manual"]),
  fuel_type: z.enum(["petrol", "diesel", "electric", "hybrid"]),
  description: z.string(),
});

export type CarFormData = z.infer<typeof carFormSchema>;

interface AddCarModalProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  carToEdit?: CarFormData;
  onSuccess?: () => void;
  carId?: number;
}

export default function AddCarModal({
  open,
  setOpen,
  carToEdit,
  onSuccess,
  carId,
}: AddCarModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      form.setValue("images_url", file);
      console.log(file);
      form.trigger("images_url");
    },
  });

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      color: "",
      transmission: "automatic",
      fuel_type: "petrol",
      description: "",
      price: 0,
      category: "Sedan",
      images_url: undefined,
      available: true,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!carToEdit) return;

    form.reset(carToEdit);

    if (typeof carToEdit.images_url === "string" && carToEdit.images_url.trim() !== "") {
      setPreview(carToEdit.images_url);
      setFile(null);
    }
  }, [carToEdit, form]);

  const onSubmit = async (data: CarFormData) => {
    const formData = new FormData();

    formData.append("make", data.make);
    formData.append("model", data.model);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("available", data.available.toString());
    formData.append("color", data.color || "");
    formData.append("transmission", data.transmission || "");
    formData.append("fuel_type", data.fuel_type || "");
    formData.append("description", data.description || "");

//     if (data.images_url instanceof File) {
//   formData.append("images_url", data.images_url);
// }
    formData.append("images_url", data.images_url);

    try {
      const token = localStorage.getItem("access_token");

      const url = carId ? `${editCarUrl}/${carId}` : addCarUrl;
      const method = carId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        let message = carId ? "Failed to update car" : "Failed to add car";
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch {
          // response might be empty or not JSON
        }
        throw new Error(message);
      }

      await res.json();

      toast.success(carId ? "Car updated successfully!" : "Car added successfully!");
      onSuccess?.();

      form.reset({
        make: "",
        model: "",
        color: "",
        transmission: "automatic",
        fuel_type: "petrol",
        description: "",
        price: 0,
        category: "Sedan",
        images_url: undefined,
        available: true,
      });
      setPreview("");
      setFile(null);
      setOpen?.(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#FF9F1C] hover:bg-[#D17D18] font-semibold text-base">
          <Car />
          Add Car
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{carToEdit ? "Edit Car" : "Add Car"}</DialogTitle>
          <DialogDescription>
            {carToEdit ? "Edit car details." : "Fill in the car details and upload an image."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Toyota"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Camry"
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
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Red"
                        {...field}
                        className="placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmission*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select transmission"
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
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select category"
                            className="placeholder:text-xs"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Convertible">Convertible</SelectItem>
                        <SelectItem value="Super car">Super car</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuel_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select fuel type"
                            className="placeholder:text-xs"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
            <div></div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (NG)*</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-xs"
                      type="number"
                      placeholder="e.g. 25000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images_url"
              render={() => (
                <FormItem>
                  <FormLabel>Car Image*</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#FF9F1C]"
                    >
                      <input {...getInputProps()} />
                      {preview ? (
                        <Image
                          src={preview}
                          alt="Car preview"
                          width={400}
                          height={200}
                          className="h-32 w-full object-cover rounded mb-2"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Click or drag to upload image
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Rules*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. No smoking"
                      className="placeholder:text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">
                    Rules regulating the usage of your cars
                  </FormDescription>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Availability*</FormLabel>
                    <p className="text-sm text-muted-foreground text-[10px]">
                      Mark this car as available for rent
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

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
                {form.formState.isSubmitting ? "Adding..." : carToEdit ? "Update Car" : "Add Car"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
