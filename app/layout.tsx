import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portally",
  description: "Portal assistant for Rotaract",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LocaleProvider>
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
