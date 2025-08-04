import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Secret Share",
  description: "Share encrypted secrets that can only be viewed once",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000",
  ),
  openGraph: {
    title: "Secret Share",
    description: "Share encrypted secrets that can only be viewed once",
    url: "/",
    siteName: "Secret Share",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Secret Share - Share encrypted secrets that can only be viewed once",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret Share",
    description: "Share encrypted secrets that can only be viewed once",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
