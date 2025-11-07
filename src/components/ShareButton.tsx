'use client';

import { useState } from 'react';

import { IconCheck, IconShare } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
      aria-label={copied ? 'Lien copié' : 'Copier le lien'}
    >
      {copied ? (
        <>
          <IconCheck className="h-4 w-4" />
          <span className="text-sm">Copié !</span>
        </>
      ) : (
        <>
          <IconShare className="h-4 w-4" />
          <span className="text-sm">Copier le lien</span>
        </>
      )}
    </Button>
  );
}
