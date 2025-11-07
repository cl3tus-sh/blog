import { notFound } from 'next/navigation';

import { BackLink } from '@/components/BackLink';
import { PostCard } from '@/components/PostCard';
import { Card, CardContent } from '@/components/ui/card';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="wrapper">
      <BackLink href="/tags">Retour aux tags</BackLink>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Tag: {tag}</h1>
        <p className="text-lg text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'article trouvé' : 'articles trouvés'}
        </p>
      </div>

      <div className="space-y-16">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun article trouvé pour ce tag.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
