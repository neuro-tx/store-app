import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToaster } from "@/components/ThemedToaster ";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "دار الواحة | منتجات غذائية طبيعية من واحة سيوة",
  description:
    "اكتشف منتجات دار الواحة الغذائية الطبيعية المستخرجة من واحة سيوة — زيوت الزيتون، التمر، العسل، الأعشاب، والمزيد من خيرات الطبيعة الأصيلة.",
  keywords: [
    "دار الواحة",
    "واحة سيوة",
    "منتجات طبيعية",
    "زيت الزيتون",
    "التمر",
    "عسل طبيعي",
    "توابل",
    "أعشاب",
    "منتجات سيوة",
    "غذاء صحي",
  ],
  authors: [{ name: "دار الواحة" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="antialiased">
          <Header />
          {/* <Header2 /> */}
          {children}
          <ThemedToaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
