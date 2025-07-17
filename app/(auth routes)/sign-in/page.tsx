"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import componentStyles from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { UserRequest } from "@/types/user";
import { login } from "@/lib/api/clientApi";

const UserLoginPage = () => {
  const pageNavigator = useRouter();
  const [displayError, setLoginError] = useState("");
  const updateAuthUser = useAuthStore((state) => state.setUser);

  const handleLoginAttempt = async (inputFormData: FormData) => {
    const credentials: UserRequest = {
      email: inputFormData.get("email") as string,
      password: inputFormData.get("password") as string,
    };

    try {
      const loginResponse = await login(credentials);
      if (loginResponse) {
        updateAuthUser(loginResponse);
        pageNavigator.push("/profile");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (catchException) {
      console.error("Login error:", catchException);
      setLoginError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className={componentStyles.mainContent}>
      <form className={componentStyles.form} action={handleLoginAttempt}>
        <h1 className={componentStyles.formTitle}>User Login</h1>
        {displayError && (
          <p className={componentStyles.error}>{displayError}</p>
        )}

        <div className={componentStyles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={componentStyles.input}
            required
          />
        </div>

        <div className={componentStyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={componentStyles.input}
            required
          />
        </div>

        <div className={componentStyles.actions}>
          <button type="submit" className={componentStyles.submitButton}>
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
};

export default UserLoginPage;
