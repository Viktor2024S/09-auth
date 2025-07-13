"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios"; // Import AxiosError for better type checking

import { loginUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

// Define a type for the expected API error response
interface ApiError {
  message: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Login successful!");
      router.push("/profile");
    },
    onError: (err: Error | AxiosError) => {
      let errorMessage = "Login failed. Please check your credentials.";
      // Type guard to check if it's an AxiosError with a response
      if (err instanceof AxiosError && err.response) {
        const errorData = err.response.data as ApiError;
        errorMessage = errorData.message || errorMessage;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    mutation.mutate(formData);
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        {/* ... rest of the form ... */}
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
        <p className={css.note}>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className={css.link}>
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
