import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Register } from "@/services/auth-api";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: Register,
    onSuccess: () => {
      toast.success("Login successful!");

      // // Navigate based on role
      // if (data.user.role === "admin") {
      //   navigate("/admin/dashboard");
      // } else {
      //   navigate("/user/dashboard");
      // }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    // console.log(formData);

    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex w-1/2 items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-zinc-400">
          Register a new account
        </p>

        {/* Name Field */}
        <div className="space-y-1">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Sign Up"}
        </Button>

        {/* Message */}
        {isError && (
          <p className="text-sm text-red-500 text-center">
            ❌{" "}
            {error?.response?.data?.message ||
              error?.message ||
              "Registration failed"}
          </p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-500 text-center">
            ✅ Registration successful!
          </p>
        )}

        {/* Footer Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:underline hover:text-blue-600 dark:hover:text-white"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
