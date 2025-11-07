'use client';

import { useState } from 'react';

import { IconCheck, IconCopy } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.querySelector(`.${className?.split(' ').join('.')} code`);
    const code = codeElement?.textContent || '';

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={copied ? 'Code copié' : 'Copier le code'}
      >
        {copied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
      </Button>
      <pre className={className}>{children}</pre>
    </div>
  );
}
