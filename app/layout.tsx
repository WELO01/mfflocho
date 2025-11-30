import { ReduxProvider } from "@/src/store/Reduxrpovider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // 👈 Importa este módulo
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flocho.com",
  description: "Crea y personaliza tus propios diseños",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale || "en"}>
      <head>
        {/* ✅ Script de Google Maps para autocompletado */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} bg-black text-white`}>
        <NextIntlClientProvider>
          <ReduxProvider>
            <main>{children}</main>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
