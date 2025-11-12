'use client';

import { useEffect, useRef, useState } from 'react';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
// Plugin pour les numéros de ligne
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import { cn } from '@/lib/utils';

import '../lib/prism/themes/catppuccin/frappe.css';

type CodeProps = {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
};

export function Code({
  children,
  language = 'plaintext',
  showLineNumbers = false,
  className,
}: CodeProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const codeString = children.trimEnd();

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [codeString, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group py-4">
      <div className="absolute left-4 top-8 text-xs uppercase tracking-wide text-muted-foreground select-none z-10">
        {language}
      </div>

      <button
        onClick={handleCopy}
        className="absolute right-2 top-8 p-2 rounded-md bg-muted/80 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label={copied ? 'Code copié' : 'Copier le code'}
      >
        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
      </button>

      <pre
        className={cn(
          'rounded-lg bg-muted/30 border border-border overflow-x-auto pt-10!',
          showLineNumbers && 'line-numbers',
          className
        )}
      >
        <code ref={codeRef} className={`language-${language}`}>
          {codeString}
        </code>
      </pre>
    </div>
  );
}

interface InlineCodeProps {
  children: string;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground/90',
        className
      )}
    >
      {children}
    </code>
  );
}
