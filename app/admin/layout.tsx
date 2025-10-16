import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/ThemedToaster ";
import { Metadata } from "next";
import React from "react";

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
          {children}
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
