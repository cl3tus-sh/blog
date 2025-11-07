import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconRss,
} from '@tabler/icons-react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. Tous droits réservés.
            </p>
          </div>
          <div className="flex gap-6 text-sm items-center">
            <Link
              href={siteConfig.socials.github}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
              title="Voir mon profil GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.socials.twitter}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
              title="Me suivre sur Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandTwitter className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.socials.instagram}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
              title="Me suivre sur Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram className="h-5 w-5" />
            </Link>
            <Link
              href="/rss.xml"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Flux RSS"
              title="S'abonner au flux RSS"
            >
              <IconRss className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
