"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios";

import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";

interface ApiError {
  message: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Registration successful!");
      router.push("/profile");
    },
    onError: (err: Error | AxiosError) => {
      let errorMessage = "Registration failed. Please try again.";
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
    const username = formData.email.split("@")[0];
    mutation.mutate({ ...formData, username });
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
            {mutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
        <p className={css.note}>
          Already have an account?{" "}
          <Link href="/sign-in" className={css.link}>
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
