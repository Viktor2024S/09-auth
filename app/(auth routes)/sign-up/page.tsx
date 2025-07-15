"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { UserAuth } from "@/types/user";
import toast from "react-hot-toast";
import css from "./SignUpPage.module.css";
import { AxiosError } from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const formValues: UserAuth = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const user = await registerUser(formValues);
      if (user) {
        setUser(user);
        toast.success("Registration successful! Redirecting...");
        router.push("/profile");
      } else {
        setError("Registration failed. Please try again.");
        toast.error("Registration failed.");
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      console.error("Registration error:", axiosError);
      setError(
        axiosError.response?.data?.message ||
          "Registration failed. Invalid credentials."
      );
      toast.error(axiosError.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
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
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
