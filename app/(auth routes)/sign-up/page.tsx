"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import localStyles from "./SignUpPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";

const NewUserRegistrationForm = () => {
  const navigationTool = useRouter();
  const [apiError, setApiError] = useState("");
  const updateUser = useAuthStore((state) => state.setUser);

  const handleFormSubmit = async (submissionData: FormData) => {
    const userData: UserRequest = {
      email: submissionData.get("email") as string,
      password: submissionData.get("password") as string,
    };

    try {
      const apiResponse = await register(userData);
      if (apiResponse) {
        updateUser(apiResponse);
        navigationTool.push("/profile");
      } else {
        setApiError("Invalid email or password.");
      }
    } catch (catchError) {
      console.error("Registration error:", catchError);
      setApiError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className={localStyles.mainContent}>
      <form className={localStyles.form} action={handleFormSubmit}>
        <h1 className={localStyles.formTitle}>User Registration</h1>
        {apiError && <p className={localStyles.error}>{apiError}</p>}
        <div className={localStyles.formGroup}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            className={localStyles.input}
            required
          />
        </div>
        <div className={localStyles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={localStyles.input}
            required
          />
        </div>
        <div className={localStyles.actions}>
          <button type="submit" className={localStyles.submitButton}>
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewUserRegistrationForm;
