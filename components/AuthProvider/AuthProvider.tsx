"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { verifyUserSession, fetchCurrentUserData } from "@/lib/api/clientApi";

type AuthContextProviderProps = {
  wrappedContent: React.ReactNode;
};

const ApplicationAuthenticator = ({
  wrappedContent,
}: AuthContextProviderProps) => {
  const setAuthUser = useAuthStore((state) => state.setUser);
  const resetAuthStatus = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const performSessionCheck = async () => {
      try {
        const sessionVerificationResult = await verifyUserSession();
        if (sessionVerificationResult.success) {
          const authenticatedUserData = await fetchCurrentUserData();
          if (authenticatedUserData) setAuthUser(authenticatedUserData);
        } else {
          resetAuthStatus();
        }
      } catch (sessionCheckError) {
        resetAuthStatus();
        console.error("Authentication verification failed:", sessionCheckError);
      }
    };
    performSessionCheck();
  }, [setAuthUser, resetAuthStatus]);

  return wrappedContent;
};

export default ApplicationAuthenticator;
