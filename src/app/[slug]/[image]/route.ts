import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; image: string }> }
) {
  const { slug, image } = await params;
  const imagePath = path.join(process.cwd(), 'src', 'content', 'posts', slug, image);

  if (!fs.existsSync(imagePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const ext = path.extname(image).toLowerCase();

  const contentType =
    {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    }[ext] || 'image/jpeg';

  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
