import { PostCard } from '@/components/PostCard';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="wrapper">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">{siteConfig.name}</h1>
        <p className="text-xl text-muted-foreground">{siteConfig.description}</p>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun article pour le moment. Revenez bientôt !
          </CardContent>
        </Card>
      )}
    </div>
  );
}
