"use client";
import React, { useState } from "react";
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
import { SignInValidation } from "@/utils/validation";
import { ChevronRight } from "lucide-react";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInValidation>) => {
    console.log("Form values:", values);
    console.log(values);
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // API Call to UserRegistration
      const response = await fetch(
        "https://kremlin.share-hub.co/users/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      setSuccessMessage("Logging you in shortly :)");
      console.log("API Response:", data);
      window.location.href = '/listings'
      // Optionally, redirect the user to the login page or dashboard
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to Log you in");
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignUp = () => {
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

         {/* Display error or success messages */}
         {errorMessage && (
          <div className="text-red-500 text-center text-sm">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center text-sm">
            {successMessage}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* User Name */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>User Name</Label>
                  <FormControl>
                    <Input
                      placeholder="Username"
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
                      placeholder="Enter your password"
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
              disabled={isLoading}
              className="w-full bg-primaryColor hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              {isLoading ? "Hang tight..." : "Log In"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-primaryColor hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
