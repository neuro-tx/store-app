"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface BtnProps {
  cls?: string;
  path: string;
  children: React.ReactNode;
  prefetch?: boolean;
}

const RouterBtn = ({
  cls = "",
  path,
  children,
  prefetch = true,
}: BtnProps) => {
  const router = useRouter();

  return (
    <button
      className={cls}
      onClick={() => {
        if (prefetch) router.prefetch(path);
        router.push(path);
      }}
    >
      {children}
    </button>
  );
};

export default RouterBtn;
