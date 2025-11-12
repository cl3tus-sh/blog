import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

// Plugin remark pour corriger les chemins d'images
function remarkImagePath(slug: string) {
  return (tree: any) => {
    visit(tree, 'image', (node: any) => {
      if (node.url && node.url.startsWith('./')) {
        // Convertir ./image.jpg en /slug/image.jpg
        node.url = `/${slug}/${node.url.slice(2)}`;
      }
    });
  };
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  updated_date?: string;
  description?: string;
  image?: string;
  tags?: string[];
}

export interface PostWithContent extends Post {
  content: string;
}

export function getAllPosts(): Post[] {
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      const slug = entry.name;
      const postDir = path.join(postsDirectory, slug);
      const mdPath = path.join(postDir, 'index.md');

      if (!fs.existsSync(mdPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(mdPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        updated_date: data.updated_date,
        description: data.description,
        tags: data.tags || [],
        image: data.image ? `/${slug}/${data.image}` : undefined,
      } as Post;
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  // Filtrer les requêtes invalides (extensions de fichiers, fichiers système)
  const invalidExtensions = ['.map', '.js', '.css', '.json', '.xml', '.txt', '.ico'];
  const hasInvalidExtension = invalidExtensions.some(ext => slug.endsWith(ext));

  if (hasInvalidExtension || slug.startsWith('_') || slug.startsWith('.')) {
    return null;
  }

  const postDir = path.join(postsDirectory, slug);
  const mdPath = path.join(postDir, 'index.md');

  if (!fs.existsSync(mdPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkImagePath, slug)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    updated_date: data.updated_date,
    description: data.description,
    tags: data.tags || [],
    image: data.image ? `/${slug}/${data.image}` : undefined,
    content: processed.toString(),
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.tags?.includes(tag));
}
