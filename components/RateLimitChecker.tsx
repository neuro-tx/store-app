"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function RateLimitChecker() {
  useEffect(() => {
    let lastCookie = document.cookie;

    const observer = new MutationObserver(() => {
      const currentCookie = document.cookie;
      if (currentCookie !== lastCookie) {
        lastCookie = currentCookie;

        const cookies = Object.fromEntries(
          currentCookie.split("; ").map((c) => {
            const [key, ...rest] = c.split("=");
            return [key, decodeURIComponent(rest.join("="))];
          })
        );

        if (cookies["rate-limit-status"] === "exceeded") {
          toast.warning(
            "لقد تجاوزت الحد المسموح به لعدد الطلبات. الرجاء الانتظار قبل المحاولة مجددًا."
          );
        }
      }
    });

    observer.observe(document, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
