import { Suspense } from 'react';
import { initialProperties } from '@/lib/initialData';
import PropertyDetailClient from './PropertyDetailClient';

export function generateStaticParams() {
  return initialProperties.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Loading Property Details...</p>
          </div>
        </div>
      }
    >
      <PropertyDetailClient slug={slug} />
    </Suspense>
  );
}
