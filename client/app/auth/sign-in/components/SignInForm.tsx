"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignUpValidation, SignInValidation } from "@/utils/validation";
import { ChevronRight } from "lucide-react";

export default function SignInForm() {
  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpValidation>) => {
    console.log("Form values:", values);
  };
  

  const onGoogleSignUp = async () => {
    try {
      const response = await fetch('https://kremlin.share-hub.co/users/users/google_login/')
      const data = response.json

      console.log(data)
    } catch (error) {
       // Type guard to check if error is an instance of Error
       if (error instanceof Error) {
        setErrorMessage(error.message || "Failed to Log you in");
      } else {
        // Fallback for unknown error types
        setErrorMessage("An unknown error occurred");
      }
    }
    console.log("Google Sign Up Initiated");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primaryColor mb-4">
            Login In To Your Account
          </h1>
          <p className="text-gray-500 mb-6">Buy or Sell Tractors with Ease</p>
        </div>

        {/* Google Sign-Up Button */}
        <Button
          variant="outline"
          onClick={onGoogleSignUp}
          className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
        >
          {/* <GoogleIcon className="h-5 w-5" /> */}
          Continue with Google
        </Button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a strong password"
                      {...field}
                      className="rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primaryColor hover:bg-orange-600 flex items-center justify-center gap-2"
            >
                Log In
              <ChevronRight className="h-4 w-4" />
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link href='/auth/sign-up' className="text-primaryColor hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
