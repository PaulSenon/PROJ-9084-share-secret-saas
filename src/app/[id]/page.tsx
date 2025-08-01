import { SecretViewer } from "~/components/secret-viewer";

interface SecretPageProps {
  params: Promise<{ id: string }>;
}

export default async function SecretPage({ params }: SecretPageProps) {
  const { id } = await params;
  
  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Secret Message</h1>
        <p className="text-gray-600">This secret can only be viewed once</p>
      </div>

      <SecretViewer secretId={id} />
    </main>
  );
}

// Enable SSG for all secret pages
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
