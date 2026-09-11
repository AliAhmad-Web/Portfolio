/**
 * Derive sibling AVIF/WebP URLs for a public raster image path.
 * Purpose: Serve modern formats without changing source data paths used by SEO/OG.
 */

const RASTER_EXT = /\.(png|jpe?g|gif)$/i

export function isLocalRasterSrc(src) {
  return typeof src === 'string' && src.startsWith('/') && !src.startsWith('//') && RASTER_EXT.test(src)
}

export function getModernImageSources(src) {
  if (!isLocalRasterSrc(src)) {
    return { fallback: src, webp: null, avif: null }
  }

  const base = src.replace(RASTER_EXT, '')
  return {
    fallback: src,
    webp: `${base}.webp`,
    avif: `${base}.avif`,
  }
}
