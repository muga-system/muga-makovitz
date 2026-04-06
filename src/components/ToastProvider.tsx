"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Toaster
      className="nm-toaster"
      position={isMobile ? "bottom-center" : "bottom-right"}
      closeButton
      offset={isMobile ? 12 : 16}
      toastOptions={{
        duration: 2600,
        className: "nm-toast",
      }}
    />
  );
}
