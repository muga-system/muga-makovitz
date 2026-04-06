"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      className="nm-toaster"
      position="bottom-right"
      closeButton
      offset={16}
      toastOptions={{
        duration: 2600,
        className: "nm-toast",
      }}
    />
  );
}
