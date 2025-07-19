"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null;
};
