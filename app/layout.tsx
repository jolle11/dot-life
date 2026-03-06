import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://dotlife.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "dot life — Visualiza tu vida en puntos",
    template: "%s | dot life",
  },
  description:
    "Visualiza cuánto tiempo has vivido y cuánto te queda. Cada punto es una semana, un mes o un año de tu vida. Añade milestones y comparte tu grid.",
  applicationName: "dot life",
  authors: [{ name: "Jordi Ollé Ballesté" }],
  keywords: [
    "life in weeks",
    "life calendar",
    "vida en semanas",
    "visualizar vida",
    "dot life",
    "life expectancy",
    "esperanza de vida",
    "life grid",
    "milestones",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "dot life",
    title: "dot life — Visualiza tu vida en puntos",
    description:
      "Cada punto es una semana, un mes o un año de tu vida. Descubre cuánto has vivido y cuánto te queda.",
    url: SITE_URL,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "dot life — Visualiza tu vida en puntos",
    description:
      "Cada punto es una semana, un mes o un año de tu vida. Descubre cuánto has vivido y cuánto te queda.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "dot life",
    url: SITE_URL,
    description:
      "Visualiza cuánto tiempo has vivido y cuánto te queda en un grid de puntos interactivo.",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Person",
      name: "Jordi Ollé Ballesté",
    },
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <noscript>
          <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>dot life</h1>
            <p>
              Visualiza tu vida en puntos. Cada punto es una semana, un mes o un
              año de tu vida. Descubre cuánto has vivido y cuánto te queda.
            </p>
            <p>
              Visualize your life in dots. Each dot is a week, a month, or a
              year. Discover how much you have lived and how much is left.
            </p>
            <p>Esta aplicación requiere JavaScript para funcionar.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
