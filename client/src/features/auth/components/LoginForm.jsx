import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/services/auth-api";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      console.log("Login Response", data); // 👈 Important

      if (!data?.user?._id) {
        toast.error("User ID not found in response");
        return;
      }

      login({
        name: data.user.name,
        id:data.user._id,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      });

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        userId = data.user._id;
        console.log("Navigating to:", `/user/dashboard/${userId}`);
        navigate(`/user/dashboard/${data.user._id}`);
      }
    },

    onError: (error) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="flex w-1/2 items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 px-4">
      <form
        onSubmit={handSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 dark:text-zinc-400">
          Enter your credentials to sign in
        </p>

        {isError && (
          <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md dark:bg-red-900/30">
            {error?.message || "An error occurred during login"}
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Email
          </Label>
          <Input
            onChange={handleInput}
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full"
            required
            disabled={isLoading}
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
            onChange={handleInput}
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full"
            required
            disabled={isLoading}
          />
          <Link
            to="/forgot-password"
            className="block text-sm text-right text-gray-600 dark:text-zinc-400 hover:underline hover:text-blue-600 dark:hover:text-white"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        {/* Footer Link */}
        <div className="text-center">
          <Link
            to="/register"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:underline hover:text-blue-600 dark:hover:text-white"
          >
            Don't have an account? Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
