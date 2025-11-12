/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const postsDir = path.join(process.cwd(), 'src/content/posts');
const publicDir = path.join(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read all post directories
const postDirs = fs.readdirSync(postsDir).filter(file => {
  const filePath = path.join(postsDir, file);
  return fs.statSync(filePath).isDirectory();
});

console.log('Copying post images to public directory...');

postDirs.forEach(slug => {
  const postDir = path.join(postsDir, slug);
  const targetDir = path.join(publicDir, slug);

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Get all files in the post directory
  const files = fs.readdirSync(postDir);

  // Copy image files (jpg, jpeg, png, gif, webp, svg)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const sourcePath = path.join(postDir, file);
      const targetPath = path.join(targetDir, file);

      fs.copyFileSync(sourcePath, targetPath);
      process.stdout.write(`✓ Copied: ${slug}/${file}\n`);
    }
  });
});

console.log('Done copying post images!');
