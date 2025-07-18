"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./Modal.module.css";

interface DialogProps {
  content: React.ReactNode;
  onDismiss: () => void;
}

export const GlobalAppDialog = ({ onDismiss, content }: DialogProps) => {
  const handleOverlayClick = (mouseEvent: React.MouseEvent<HTMLDivElement>) => {
    if (mouseEvent.target === mouseEvent.currentTarget) {
      onDismiss();
    }
  };

  useEffect(() => {
    const handleKeyboardEscapePress = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === "Escape") {
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyboardEscapePress);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyboardEscapePress);
      document.body.style.overflow = "";
    };
  }, [onDismiss]);

  return createPortal(
    <div
      className={modalStyles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className={modalStyles.modal}>{content}</div>
    </div>,
    document.body
  );
};
