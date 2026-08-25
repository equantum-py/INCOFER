import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/providers";
import "@/styles/globals.css";
import "@/styles/colors.css";
import "@/styles/animations.css";

const defaultDescription =
  "INCOFER Ferretería: herramientas, materiales y soluciones para obra, taller y hogar en Paraguay.";

function getMetadataBase() {
  try {
    return process.env.NEXT_PUBLIC_APP_URL
      ? new URL(process.env.NEXT_PUBLIC_APP_URL)
      : undefined;
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  title: {
    default: "INCOFER | Ferretería",
    template: "%s | INCOFER",
  },
  description: defaultDescription,
  metadataBase: getMetadataBase(),
  applicationName: "INCOFER Ferretería",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "INCOFER | Ferretería",
    description: defaultDescription,
    type: "website",
    siteName: "INCOFER Ferretería",
  },
  twitter: {
    card: "summary_large_image",
    title: "INCOFER | Ferretería",
    description: defaultDescription,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PY">
      <body className={GeistSans.className}>
        <Providers>
          <Navbar />
          <main className="pointer-events-auto mx-auto w-full max-w-[1920px]">
            {children}
            <Toaster position="bottom-right" />
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
