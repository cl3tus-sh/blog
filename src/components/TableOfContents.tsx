'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const extractHeadingsFromDOM = () => {
      const articleHeadings = document.querySelectorAll(
        'article h1, article h2, article h3, article h4, article h5, article h6'
      );

      const extractedHeadings: Heading[] = [];

      articleHeadings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        const text = heading.textContent || '';

        if (!heading.id) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          heading.id = id;
        }

        extractedHeadings.push({
          id: heading.id,
          text,
          level,
        });
      });

      setHeadings(extractedHeadings);
    };

    setTimeout(extractHeadingsFromDOM, 0);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    const headingElements = document.querySelectorAll(
      'article h1, article h2, article h3, article h4, article h5, article h6'
    );
    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc-container">
      <div className="toc-sticky">
        <h2 className="text-sm font-semibold mb-4 text-foreground">Sommaire</h2>
        <ul className="space-y-2 text-sm">
          {headings.map(heading => (
            <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  'text-left w-full hover:text-foreground transition-colors py-1 block border-l-2 border-transparent pl-3 -ml-3',
                  activeId === heading.id
                    ? 'text-foreground border-l-2 border-primary'
                    : 'text-muted-foreground'
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;
