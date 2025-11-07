import { IconHash } from '@tabler/icons-react';
import Link from 'next/link';

import { getAllTags } from '@/lib/posts';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="wrapper">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Tags</h1>
        <p className="text-lg text-muted-foreground">Explorez les articles par thématique</p>
      </div>

      {tags.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">Aucun tag pour le moment.</div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-foreground/20 transition-all duration-200"
            >
              <IconHash className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                {tag}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
