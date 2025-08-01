import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Secret Share",
  description: "Share encrypted secrets that can only be viewed once",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
