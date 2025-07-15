"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";
import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";

interface ModalProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export default function Modal({ children, dehydratedState }: ModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "";
    };
  }, [router]);

  return mounted
    ? createPortal(
        <div className={css.backdrop} onClick={() => router.back()}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <button className={css.closeButton} onClick={() => router.back()}>
              &times;
            </button>
            {dehydratedState ? (
              <HydrationBoundary state={dehydratedState}>
                {children}
              </HydrationBoundary>
            ) : (
              children
            )}
          </div>
        </div>,
        document.body
      )
    : null;
}
