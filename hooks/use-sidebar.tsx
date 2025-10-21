"use client";

import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
} from "react";

interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleSidebar = () => setOpen((prev) => !prev);
  const openSidebar = () => setOpen(true);
  const closeSidebar = () => setOpen(false);

  const value = useMemo(
    () => ({ isOpen, toggleSidebar, openSidebar, closeSidebar }),
    [isOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");

  return ctx;
};
