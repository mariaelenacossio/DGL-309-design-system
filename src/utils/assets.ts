/**
 * Resolves an image filename to the correct public URL, taking Vite's
 * `base` config into account so paths work both locally and on GitHub Pages.
 *
 * Usage:  imgUrl('B-logo-2.png')  →  /img/B-logo-2.png  (dev)
 *                                 →  /DGL-309-design-system/img/B-logo-2.png  (prod)
 */
export function imgUrl(filename: string): string {
  return `${import.meta.env.BASE_URL}img/${filename}`
}
