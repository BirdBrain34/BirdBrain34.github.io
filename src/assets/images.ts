import type { ImageMetadata } from 'astro';

// Eagerly import every image under src/assets so Astro's image pipeline
// can optimize them at build time. The map is keyed by filename (basename)
// so components can resolve an image by name regardless of its subfolder.
const modules = import.meta.glob<{ default: ImageMetadata }>('./**/*.{png,jpg,jpeg,webp,avif,gif,PNG,JPG,JPEG,WEBP,AVIF,GIF}', {
  eager: true,
});

export const images: Record<string, ImageMetadata> = {};

for (const path of Object.keys(modules)) {
  const basename = path.split('/').pop()!;
  images[basename] = modules[path].default;
}

export function getImage(name: string): ImageMetadata {
  const img = images[name];
  if (!img) {
    throw new Error(`Image not found in src/assets: ${name}`);
  }
  return img;
}