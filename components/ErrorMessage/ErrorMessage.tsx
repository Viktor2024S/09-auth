"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface NotificationMessageProps {
  displayMessage: string;
}

export const ToastNotificationDisplay = ({
  displayMessage,
}: NotificationMessageProps) => {
  useEffect(() => {
    toast.error(displayMessage);
  }, [displayMessage]);

  return null;
};
