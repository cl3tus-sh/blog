import { NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/posts';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(siteConfig.url)}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${siteConfig.url}/posts/${post.slug}`)}</link>
      <description>${escapeXml(post.description || '')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${escapeXml(`${siteConfig.url}/posts/${post.slug}`)}</guid>
      ${
        post.image
          ? `<enclosure url="${escapeXml(`${siteConfig.url}${post.image}`)}" type="image/jpeg" />`
          : ''
      }
      ${post.tags?.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
