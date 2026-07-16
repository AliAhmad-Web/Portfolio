/**
 * BrandMark — Shared portfolio brand text (AliAhmad-Web).
 * Purpose: Keep brand styling consistent across Header, Footer, Auth, Admin, Project pages.
 * Visual classes match the existing design; do not restyle without intentional design review.
 */

import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';

const defaultClassName =
  'text-xl font-black tracking-[0.25em] text-white md:text-2xl';

export default function BrandMark({
  to,
  onClick,
  className = defaultClassName,
  as: Component = 'button',
}) {
  const content = (
    <>
      {siteConfig.brand.name}
      <span className="text-cyan-400">{siteConfig.brand.suffix}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (Component === 'button') {
    return (
      <button type="button" onClick={onClick} className={className} aria-label="Go to home">
        {content}
      </button>
    );
  }

  return (
    <Component className={className} onClick={onClick}>
      {content}
    </Component>
  );
}
