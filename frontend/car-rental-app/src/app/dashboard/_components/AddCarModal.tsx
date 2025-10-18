"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Car from "@/components/svgs/car";
import { useDropzone } from "react-dropzone";
import Image from 'next/image'
import * as z from "zod";


const carFormSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.enum(["sedan", "suv", "hatchback", "truck", "van"]),
  available: z.boolean(),
  image: z.instanceof(File, { message: "Image is required" })
  .refine(file => file.size <= 5_000_000, "Max file size is 5MB")
  .refine(
    file => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Only .jpg, .jpeg, and .png formats are supported"
  ),   
});

type CarFormData = z.infer<typeof carFormSchema>;

export default function AddCarModal() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [open, setOpen] = useState(false);

  
const { getRootProps, getInputProps } = useDropzone({
  accept: { "image/*": [".jpg", ".jpeg", ".png"] },
  maxFiles: 1,
  onDrop: (acceptedFiles) => {
  const file = acceptedFiles[0];
  setFile(file);
  const url = URL.createObjectURL(file);
  setPreview(url);
  form.setValue("image", file);
  form.trigger("image");
  }   
});   

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      price: 0,
      category: "sedan",
      image: undefined,
      available: true,
    },
    mode: "onChange",
  });  

const onSubmit = async (data: CarFormData) => {
  const formData = new FormData();
  
  formData.append("data", JSON.stringify({
    make: data.make,
    model: data.model,
    price: data.price,
    category: data.category,
    available: data.available,
  }));

  formData.append("image", data.image);   
};   

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF9F1C] hover:bg-[#D17D18] font-semibold text-base">
            <Car/>
                Add Car
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
                Fill in the car details and upload an image.
           </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Toyota" {...field} className="placeholder:text-xs"/>
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Camry" {...field} className="placeholder:text-xs" />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="text-[10px]"/>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" className="placeholder:text-xs" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormMessage className="text-[10px]"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      className="placeholder:text-xs"
                      type="number"
                      placeholder="e.g. 25000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormMessage className="text-[10px]"/>
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="image"
                render={() => (
                    <FormItem>
                    <FormLabel>Car Image</FormLabel>
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
                    <p className="text-sm text-muted-foreground">Click or drag to upload image</p>
                )}
                </div>
            </FormControl>
            <FormMessage />
            <FormMessage className="text-[10px]"/>
            </FormItem>
             )}
            />   

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Availability</FormLabel>
                    <p className="text-sm text-muted-foreground text-[10px]">Mark this car as available for rent</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage className="text-[10px]"/>
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-[#FF9F1C] hover:bg-[#D17D18]">
                Add Car
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}   