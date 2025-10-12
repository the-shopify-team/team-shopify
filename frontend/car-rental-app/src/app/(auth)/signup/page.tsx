"use client"

import Link from "next/link"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { CreateUserPayload } from "@/types/auth"
import { PhoneInput } from "@/components/ui/phone-input"


const formSchema = z.object({
    username: z.string()
      .min(3, { error: "Username too short." })
      .max(20, { error: "Username too long." })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." })
      .optional()
      .or(z.literal('')),   
    email: z.email({ error: "Invalid email address" }),
    password: z.string()
      .min(8, { error: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { error: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { error: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { error: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { error: "Password must contain at least one special character" }),  
})

export default function SignupPage() {
     const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: { username: "", email: "", password: "" }
     })

  const onSubmit = (data: CreateUserPayload) => {
    console.log(data, 'signup')
  }

  return (
    <div>   
        <div className="text-center">
            <h1 className="font-bold text-4xl">Create Account</h1>
            <p className="mt-3 mb-4 text-base text-[#939393]">Create An account To Get started.</p>
        </div>  
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-[#00000099] mb-0.5">Username</FormLabel>
            <FormControl>
              <Input placeholder="Enter username" type="text" className="p-5 rounded-2xl placeholder:text-xs" {...field} />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}/>
        
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-[#00000099] mb-0.5">Email*</FormLabel>
            <FormControl>
              <Input placeholder="Enter email address" type="email" className="placeholder:text-xs p-5 rounded-2xl" {...field} />
            </FormControl>
            <FormMessage className="text-[10px]" />
          </FormItem>
        )}/>

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-[#00000099] mb-0.5">Password*</FormLabel>
            <FormControl>
              <Input placeholder="Enter password" type="password" className="placeholder:text-xs p-5 rounded-2xl"  {...field} />
            </FormControl>
            <FormDescription className="text-[10px]">
                At least 8 characters with a mix of uppercase, lowercase, number, and special character.
              </FormDescription>
            <FormMessage className="text-[10px]"/>
          </FormItem>
        )}/>
        
        {/* <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs text-[#00000099] mb-0.5">Phone</FormLabel>
            <FormControl>
              <PhoneInput 
        {...field} 
        defaultCountry="NG"
        placeholder="Enter phone number"
      />
            </FormControl>
            <FormMessage className="text-[10px]"/>
          </FormItem>
        )}/> */}
        
        <div className="mt-8">
            <Button type="submit" className="w-full bg-[#FF9F1C] py-6 rounded-2xl hover:bg-[#D17D18] font-semibold text-sm cursor-pointer">Sign Up</Button>
        </div>
      </form>
    </Form>
    <p className="mt-3 text-center text-sm"><span className="text-[#111111B2] mr-1">Already have an account?</span>< Link href="/login" className="text-[#004A99]">Log in</Link></p>
    </div>
  );
}