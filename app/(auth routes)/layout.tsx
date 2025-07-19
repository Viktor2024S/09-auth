"use client";

import { Loader } from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface AuthLayoutProp {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProp) => {
  const navigation = useRouter();
  const resetAuth = useAuthStore((state) => state.clearIsAuthenticated);
  const [isBusy, toggleBusy] = useState(true);

  useEffect(() => {
    resetAuth();
    navigation.refresh();
    toggleBusy(false);
  }, [resetAuth, navigation]);

  return isBusy ? <Loader /> : <>{children}</>;
};

export default AuthLayout;
