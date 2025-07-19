"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";
import { useState } from "react";
import styles from "./SignInPage.module.css";

const SignInPage = () => {
  const auth = useAuthStore((s) => s.setUser);
  const { push: navigate } = useRouter();

  const [msg, setMsg] = useState("");

  const onSubmit = async (form: FormData) => {
    const userData: UserRequest = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      const user = await login(userData);

      if (user) {
        auth(user);
        navigate("/profile");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (e) {
      console.error("Login failed:", e);
      setMsg("Something went wrong. Try again.");
    }
  };

  return (
    <main className={styles.mainContent}>
      <form action={onSubmit} className={styles.form}>
        <header className={styles.formTitle}>Sign in</header>

        <section className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className={styles.input}
          />
        </section>

        <section className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="password"
            className={styles.input}
          />
        </section>

        {!!msg && <div className={styles.error}>{msg}</div>}

        <footer className={styles.actions}>
          <button className={styles.submitButton} type="submit">
            Log in
          </button>
        </footer>
      </form>
    </main>
  );
};

export default SignInPage;
