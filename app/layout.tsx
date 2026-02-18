import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portally",
  description: "Portal assistant for Rotaract",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Portally",
  },
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
        <link rel="apple-touch-icon" href="/icons/180.png" />
        <meta name="theme-color" content="#D41367" />
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
