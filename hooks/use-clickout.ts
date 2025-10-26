import { useEffect, useRef } from "react";

type UseClickOutProps = {
  onClickout: () => void;
};

export function useClickout<T extends HTMLElement>({
  onClickout,
}: UseClickOutProps) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickout();
      }
    }

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClickout]);

  return ref
}
