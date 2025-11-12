'use client';

import { useEffect, useRef } from 'react';

import { createRoot } from 'react-dom/client';

import { Code } from './CodeBlock';

type PostContentProps = {
  content: string;
};

export function PostContent({ content }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const codeBlocks = contentRef.current.querySelectorAll('pre');

    codeBlocks.forEach(pre => {
      // Skip if already replaced
      if (pre.parentElement?.classList.contains('code-block-wrapper')) {
        return;
      }

      const codeElement = pre.querySelector('code');
      if (!codeElement) {
        return;
      }

      // Extract code text and language
      const codeText = codeElement.textContent || '';
      const languageClass = codeElement.className.match(/language-(\w+)/)?.[1];

      // Create wrapper for React component
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // Replace pre element with wrapper
      pre.parentNode?.insertBefore(wrapper, pre);
      pre.remove();

      // Render React component
      const root = createRoot(wrapper);
      root.render(
        <Code language={languageClass} showLineNumbers>
          {codeText}
        </Code>
      );
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-img:rounded-lg prose-headings:scroll-mt-20"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
