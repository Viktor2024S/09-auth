"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface ErrorMessageProps {
  displayMessage: string;
}

export default function ErrorMessage({ displayMessage }: ErrorMessageProps) {
  useEffect(() => {
    toast.error(displayMessage);
  }, [displayMessage]);

  return null;
}
