import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/ThemedToaster";
import React from "react";
import "../globals.css";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-svh flex w-full items-center justify-center">
            {children}
          </div>
          <ThemedToaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
