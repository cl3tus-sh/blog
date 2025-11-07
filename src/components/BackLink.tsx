import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
    >
      <IconArrowLeft className="h-4 w-4" />
      {children}
    </Link>
  );
}
