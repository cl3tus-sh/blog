import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/ThemeToggle';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <div>
      <div className="wrapper flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center justify-center gap-3">
          <span className="h-full text-lg leading-none font-medium">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm sm:gap-6">
            {siteConfig.navigationLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground capitalize transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={siteConfig.socials.github}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="GitHub"
            title="Voir mon profil GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
