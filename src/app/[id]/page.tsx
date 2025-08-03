import { SecretViewer } from "~/components/secret-viewer";

interface SecretPageProps {
  params: Promise<{ id: string }>;
}

export default async function SecretPage({ params }: SecretPageProps) {
  const { id } = await params;
  
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <SecretViewer secretId={id} />
        </div>
      </div>
    </div>
  );
}

// Enable SSG for all secret pages
export function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
