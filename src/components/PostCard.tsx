import Link from 'next/link';

import { Badge } from './ui/badge';

type PostCardProps = {
  post: {
    title: string;
    slug: string;
    date: string;
    description?: string;
    image?: string;
    tags?: string[];
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="hover:bg-accent/50 block rounded-md p-4 transition-colors space-y-1"
    >
      <h3 className="font-semibold group-hover:text-primary text-lg transition-colors">
        {post.title}
      </h3>
      {post.description ? <p>{post.description}</p> : null}
      <time className="text-sm text-muted-foreground whitespace-nowrap">
        {new Date(post.date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="transition-colors group-hover:bg-primary/10"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
