"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  displayMessage: string;
}

export default function ErrorMessage({ displayMessage }: ErrorMessageProps) {
  useEffect(() => {
    toast.error(displayMessage);
  }, [displayMessage]);

  return <div className={styles.error}>{displayMessage}</div>;
}
