"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthenticationLayoutProps {
  nestedContent: React.ReactNode;
}

const AuthenticationWrapper = ({
  nestedContent,
}: AuthenticationLayoutProps) => {
  const navHandler = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const resetAuthStatus = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    resetAuthStatus();
    navHandler.refresh();
    setIsLoading(false);
  }, [resetAuthStatus, navHandler]);

  return <>{isLoading ? <Loader /> : nestedContent}</>;
};

export default AuthenticationWrapper;
