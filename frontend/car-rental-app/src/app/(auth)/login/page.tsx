"use client";

import Link from "next/link";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { loginWithEmail } from "@/api/resource/auth";
import { LoginPayload } from "@/types/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { error: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { error: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { error: "Password must contain at least one special character" }),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginWithEmail(data);

      if (res.access) {
        localStorage.setItem("access_token", res.access);
      }

      if (res.refresh) {
        localStorage.setItem("refresh_token", res.refresh);
      }

      router.replace("/dashboard");
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-2xl sm:text-4xl">Log in</h1>
        <p className="mt-3 mb-4 text-sm md:text-base text-[#939393]">Welcome to RideHive.</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-[#00000099] mb-0.5">Email*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    type="email"
                    className="placeholder:text-xs p-5 rounded-2xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-[#00000099] mb-0.5">Password*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    type="password"
                    className="placeholder:text-xs p-5 rounded-2xl"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">
                  At least 8 characters with a mix of uppercase, lowercase, number, and special
                  character.
                </FormDescription>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <div className="mt-8">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className={cn(
                "w-full py-6 rounded-2xl font-semibold text-sm",
                form.formState.isSubmitting
                  ? "bg-[#FF9F1C]/70 cursor-not-allowed"
                  : "bg-[#FF9F1C] hover:bg-[#D17D18] cursor-pointer"
              )}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-3 text-center text-sm">
        <span className="text-[#111111B2] mr-1">Don’t Have an Account?</span>
        <Link
          href="/signup"
          className="text-[#004A99]"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
