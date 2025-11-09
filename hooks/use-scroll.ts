import React, { useEffect, useState } from "react";

export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    scrollY: typeof window === "undefined" ? 0 : window.scrollY,
    scrollX: typeof window === "undefined" ? 0 : window.scrollX,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}
