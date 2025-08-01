import { SecretForm } from "~/components/secret-form";

export default function HomePage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Share a Secret</h1>
        <p className="text-gray-600">
          Create an encrypted, ephemeral secret that can only be viewed once
        </p>
      </div>

      <SecretForm />
    </main>
  );
}
