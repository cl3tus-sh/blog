'use client';

import { useEffect, useRef } from 'react';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { createRoot } from 'react-dom/client';

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const codeBlocks = contentRef.current.querySelectorAll('pre');

    codeBlocks.forEach(pre => {
      if (pre.querySelector('.copy-button')) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';

      const button = document.createElement('button');
      button.className =
        'copy-button absolute right-2 top-2 p-2 rounded-md bg-muted/80 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity';
      button.setAttribute('aria-label', 'Copier le code');

      const iconContainer = document.createElement('span');
      button.appendChild(iconContainer);

      const root = createRoot(iconContainer);
      let isCopied = false;

      const renderIcon = () => {
        root.render(isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />);
      };

      renderIcon();

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code');

        if (!code) {
          return;
        }

        try {
          await navigator.clipboard.writeText(code.textContent || '');

          isCopied = true;
          renderIcon();

          setTimeout(() => {
            isCopied = false;
            renderIcon();
          }, 2000);
        } catch (err) {
          console.error('Erreur lors de la copie:', err);
        }
      });

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-headings:scroll-mt-20"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
