import { Metadata } from 'next';

import { PostContent } from '@/components/PostContent';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getPageBySlug } from '@/lib/pages';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('a-propos');

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}/${page.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description: page.description,
    },
  };
}

export default async function AProposPage() {
  const page = await getPageBySlug('a-propos');

  return (
    <div className="post-container">
      <article className="wrapper">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page.title}</h1>
        </header>

        <Separator className="mb-8" />

        <PostContent content={page.content} />
      </article>
    </div>
  );
}
