/**
 * SeoHead — Document metadata for public and private routes.
 * Purpose: Unique title, description, canonical, robots, Open Graph, Twitter, and JSON-LD.
 * Used by: HomePage, ProjectDetailPage, AuthLayout, AdminLayout, NotFoundPage.
 */

import { Helmet } from 'react-helmet-async';
import { absUrl, getSiteUrl, homeSeo, seoConfig } from '../../data/seo';
import { siteConfig } from '../../data/site';

export default function SeoHead({
  title = homeSeo.title,
  description = homeSeo.description,
  path = '/',
  image = seoConfig.image.path,
  imageAlt = seoConfig.image.alt,
  type = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  jsonLd,
}) {
  const isNotFound = path === '/404';
  const canonical = isNotFound ? absUrl('/') : absUrl(path);
  const imageUrl = image.startsWith('http') ? image : absUrl(image);
  const siteUrl = getSiteUrl();
  const isDefaultImage = image === seoConfig.image.path;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={seoConfig.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.brand.fullName} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content={seoConfig.themeColor} />
      <meta name="geo.region" content={seoConfig.location.geoRegion} />
      <meta name="geo.placename" content={`${seoConfig.location.city}, ${seoConfig.location.country}`} />
      {isNotFound ? null : <link rel="canonical" href={canonical} />}
      {isNotFound ? null : <link rel="alternate" hrefLang="en" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content={seoConfig.image.type} />
      {isDefaultImage ? (
        <>
          <meta property="og:image:width" content={String(seoConfig.image.width)} />
          <meta property="og:image:height" content={String(seoConfig.image.height)} />
        </>
      ) : null}

      <meta name="twitter:card" content={seoConfig.twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="application-name" content={seoConfig.siteName} />
      <link rel="image_src" href={imageUrl} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={imageUrl} />
      <link rel="author" href={siteUrl} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
