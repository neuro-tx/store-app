import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/ThemedToaster ";
import { Metadata } from "next";
import React from "react";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import SiderbarProvider from "../providers/SiderbarProvider";
import Navbar from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "لوحة التحكم | دار الواحة",
  description:
    "إدارة منتجات دار الواحة، الطلبات، العملاء والمحتوى من خلال لوحة التحكم الإدارية.",
  robots: {
    index: false,
    follow: false,
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiderbarProvider>
            <div className="w-full min-h-svh overflow-x-hidden relative">
              <Sidebar />
              
              <main className="mr-0 md:mr-64 transition duration-300">
                <Navbar />
                {children}
              </main>
              <ThemedToaster />
            </div>
          </SiderbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
