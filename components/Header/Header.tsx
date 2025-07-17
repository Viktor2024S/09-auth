"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type ChildrenProp = {
  wrappedContent: React.ReactNode;
};

const ApplicationAuthenticator = ({ wrappedContent }: ChildrenProp) => {
  const setUserDataInStore = useAuthStore((state) => state.setUser);
  const resetAuthStatusInStore = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const initializeUserSession = async () => {
      try {
        const sessionVerificationResult = await checkSession();
        if (sessionVerificationResult.success) {
          const loggedInUser = await getMe();
          if (loggedInUser) setUserDataInStore(loggedInUser);
        } else {
          resetAuthStatusInStore();
        }
      } catch (sessionCheckError) {
        resetAuthStatusInStore();
        console.error("Auth check failed:", sessionCheckError);
      }
    };
    initializeUserSession();
  }, [setUserDataInStore, resetAuthStatusInStore]);

  return wrappedContent;
};

export default ApplicationAuthenticator;
