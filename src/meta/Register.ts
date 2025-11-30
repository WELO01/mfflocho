import type { Metadata } from "next";

/**
 * 🧩 Metadatos SEO para la página de registro
 */
export const registerMeta: Metadata = {
  title: "Crear cuenta | Flocho",
  description:
    "Regístrate en Flocho para personalizar tus productos, guardar tus diseños y acceder a ofertas exclusivas.",
  keywords: [
    "flocho",
    "registro",
    "crear cuenta",
    "personalización",
    "tazas personalizadas",
    "camisetas",
    "diseños únicos",
  ],
  openGraph: {
    title: "Crear cuenta | Flocho",
    description:
      "Únete a Flocho y diseña tus propios productos personalizados fácilmente.",
    url: "https://flocho.com/register",
    siteName: "Flocho",
    images: [
      {
        url: "https://flocho.com/images/meta/register-preview.png",
        width: 1200,
        height: 630,
        alt: "Registro Flocho - crea tu cuenta para personalizar tus productos",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crear cuenta | Flocho",
    description:
      "Regístrate en Flocho y crea productos personalizados a tu manera.",
    images: ["https://flocho.com/images/meta/register-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
