import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const links = [
    { title: "الرئيسية", href: "/" },
    { title: "المنتجات", href: "/products" },
    { title: "الفئات", href: "/categories" },
    { title: "المميزة", href: "/products/features" },
    { title: "من نحن", href: "/about" },
  ];

  return (
    <footer className="py-16 md:py-28 border-t bg-neutral-900 border-border">
      <div className="mx-auto max-w-5xl px-6 space-y-3">
        <div className="mx-auto block size-fit">
          <Image
            src="/images/logo.svg"
            alt="Dar El Waha"
            width={135}
            height={40}
            priority
          />
        </div>

        {/* Navigation Links */}
        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-150 hover:underline font-medium font-cairo"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-8 text-muted-foreground">
          {/* WhatsApp */}
          <Link
            href="https://wa.me/201044512246"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-green-500 transition-colors"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.52 3.48A11.85 11.85 0 0 0 12 0A12 12 0 0 0 0 12a11.88 11.88 0 0 0 1.69 6.09L0 24l6.1-1.6A12 12 0 0 0 12 24a12 12 0 0 0 8.52-20.52m-8.52 18A9.76 9.76 0 0 1 6.06 20l-.43-.26l-3.61 1l1-3.52l-.28-.45A9.78 9.78 0 0 1 2.24 12a9.8 9.8 0 0 1 16.71-7A9.8 9.8 0 0 1 12 21.48m5.05-7.56c-.27-.14-1.63-.8-1.88-.89s-.44-.14-.63.14s-.72.89-.88 1.07s-.33.2-.6.07s-1.16-.43-2.21-1.36a8.31 8.31 0 0 1-1.54-1.9c-.16-.27 0-.42.12-.56s.27-.33.4-.49a1.83 1.83 0 0 0 .27-.45a.51.51 0 0 0 0-.48c-.07-.14-.63-1.51-.86-2.07s-.46-.48-.63-.49h-.53a1 1 0 0 0-.73.34a3.05 3.05 0 0 0-.95 2.27a5.27 5.27 0 0 0 1.09 2.8a12 12 0 0 0 4.52 4.2a15.48 15.48 0 0 0 1.56.57a3.74 3.74 0 0 0 1.7.11a2.77 2.77 0 0 0 1.8-1.27a2.21 2.21 0 0 0 .16-1.27c-.08-.14-.25-.21-.52-.34" />
            </svg>
          </Link>

          {/* phone number */}
          <Link
            href="tel:+201044512246"
            aria-label="Phone Number"
            className="hover:text-emerald-500 transition-colors"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 15.5c-1.25 0-2.47-.2-3.63-.58a1 1 0 0 0-.95.24l-2.2 2.21a15.05 15.05 0 0 1-6.59-6.59l2.21-2.2a1 1 0 0 0 .24-.95A11.58 11.58 0 0 0 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1a17 17 0 0 0 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1" />
            </svg>
          </Link>

          {/* Facebook */}
          <Link
            href="https://www.facebook.co
m/share/17CnRHqeok/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Page"
            className="hover:text-blue-600 transition-colors"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C19.05 21.45 22 17.19 22 12z" />
            </svg>
          </Link>
        </div>

        <span className="text-sm block text-center text-muted-foreground mt-8">
          © {new Date().getFullYear()} دار الواحة. جميع الحقوق محفوظة.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
