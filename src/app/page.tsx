import { SecretForm } from "~/components/secret-form";

export default function HomePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <SecretForm />
        </div>
      </div>
    </div>
  );
}
