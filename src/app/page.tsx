import { type Metadata } from "next";
import { SecretForm } from "~/components/secret-form";

export const metadata: Metadata = {
  title: "Secret Share - Share Encrypted Secrets Securely",
  description:
    "Share encrypted secrets that can only be viewed once. End-to-end encrypted, zero-knowledge architecture ensures your sensitive information stays private.",
  openGraph: {
    title: "Secret Share - Share Encrypted Secrets Securely",
    description:
      "Share encrypted secrets that can only be viewed once. End-to-end encrypted, zero-knowledge architecture ensures your sensitive information stays private.",
    url: "/",
    siteName: "Secret Share",
    images: [
      {
        url: "/api/og?title=Secret Share&description=Share encrypted secrets that can only be viewed once&theme=blue",
        width: 1200,
        height: 630,
        alt: "Secret Share - Share encrypted secrets securely",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secret Share - Share Encrypted Secrets Securely",
    description:
      "Share encrypted secrets that can only be viewed once. End-to-end encrypted, zero-knowledge architecture ensures your sensitive information stays private.",
    images: [
      "/api/og?title=Secret Share&description=Share encrypted secrets that can only be viewed once&theme=blue",
    ],
  },
};

export default function HomePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <SecretForm />
        </div>
      </div>
    </div>
  );
}
