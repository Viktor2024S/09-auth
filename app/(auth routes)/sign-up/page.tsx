"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const { push } = useRouter();
  const { setUser } = useAuthStore((s) => s);
  const [message, setMessage] = useState("");

  const onRegister = async (form: FormData) => {
    const payload: UserRequest = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const newUser = await register(payload);

      if (newUser) {
        setUser(newUser);
        push("/profile");
      } else {
        setMessage("Invalid email or password");
      }
    } catch (err) {
      console.error("Sign-up failed:", err);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <main className={styles.mainContent}>
      <form action={onRegister} className={styles.form}>
        <header className={styles.formTitle}>Sign up</header>

        <section className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            required
          />
        </section>

        <section className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            required
          />
        </section>

        {message && <div className={styles.error}>{message}</div>}

        <footer className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </footer>
      </form>
    </main>
  );
};

export default SignUpPage;
