"use client";

import { useEffect } from "react";
import { useRouter, useState } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const clearIsAuth = useAuthStore((state) => state.clearIsAuthenticated);
  useEffect(() => {
    clearIsAuth();
    router.refresh();
    setLoading(false);
  }, [clearIsAuth, router]);

  return <>{loading ? <Loader /> : children}</>;
}

export default AuthLayout;
