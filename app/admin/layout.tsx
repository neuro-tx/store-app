import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/ThemedToaster ";
import { Metadata } from "next";
import React from "react";
import "../globals.css";
import Link from "next/link";

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
          <div className="w-full min-h-svh overflow-x-hidden relative">
            <div className="mx-auto container p-4 lg:px-6 py-3">
              <div className="space-y-6">
                <div className="py-2 pb-4 border-b">
                  <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3">
                    <div>
                      <h1 className="text-2xl font-bold font-cairo text-primary">
                        لوحة التحكم الإدارية
                      </h1>
                      <p className="text-muted-foreground text-sm">
                        إدارة المحتوى وإعدادات النظام من مكان واحد.
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="border px-5 py-2 rounded-lg text-sm bg-primary hover:opacity-95 w-full md:w-fit"
                    >
                      العودة للرئيسية
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {children}
            <ThemedToaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default layout;
