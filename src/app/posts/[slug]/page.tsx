import { IconCalendar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BackLink } from '@/components/BackLink';
import { PostContent } from '@/components/PostContent';
import { ShareButton } from '@/components/ShareButton';
import { TableOfContents } from '@/components/TableOfContents';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/posts/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="post-container">
      <article className="wrapper">
        <BackLink href="/">Retour aux articles</BackLink>

        <header className="mb-8">
          {post.image && (
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <IconCalendar className="h-4 w-4" />
              <time className="text-sm">
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.updated_date && (
              <div className="flex items-center gap-2">
                <span className="text-sm hidden md:inline">•</span>
                <span className="text-sm">
                  Mis à jour le{' '}
                  {new Date(post.updated_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            <div className="md:ml-auto">
              <ShareButton url={`${siteConfig.url}/posts/${post.slug}`} />
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </header>

        <Separator className="mb-8" />

        <PostContent content={post.content} />

        <Separator className="my-8" />

        <div className="flex justify-center">
          <ShareButton url={`${siteConfig.url}/posts/${post.slug}`} />
        </div>
      </article>

      <TableOfContents content={post.content} />
    </div>
  );
}
