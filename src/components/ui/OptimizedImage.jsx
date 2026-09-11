/**
 * OptimizedImage — Picture wrapper for AVIF/WebP with the original raster fallback.
 * Purpose: Faster image decode without changing layout, alt text, or crop CSS.
 */

import { getModernImageSources, isLocalRasterSrc } from '../../utils/optimizedImage'

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  ...rest
}) {
  const sources = getModernImageSources(src)
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      {...rest}
    />
  )

  if (!isLocalRasterSrc(src) || (!sources.avif && !sources.webp)) {
    return img
  }

  return (
    <picture style={{ display: 'contents' }}>
      {sources.avif ? <source type="image/avif" srcSet={sources.avif} sizes={sizes} /> : null}
      {sources.webp ? <source type="image/webp" srcSet={sources.webp} sizes={sizes} /> : null}
      {img}
    </picture>
  )
}
