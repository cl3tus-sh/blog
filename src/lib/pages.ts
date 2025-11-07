import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

const pagesDirectory = path.join(process.cwd(), 'src/content/pages');

export interface Page {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

export interface PageWithContent extends Page {
  content: string;
}

export function getAllPages(): Page[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(pagesDirectory, { withFileTypes: true });

  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => {
      const slug = entry.name.replace(/\.md$/, '');
      const mdPath = path.join(pagesDirectory, entry.name);

      const fileContents = fs.readFileSync(mdPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        image: data.image,
      } as Page;
    });
}

export async function getPageBySlug(slug: string): Promise<PageWithContent> {
  const mdPath = path.join(pagesDirectory, `${slug}.md`);

  if (!fs.existsSync(mdPath)) {
    throw new Error(`Page not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    image: data.image,
    content: processed.toString(),
  };
}
