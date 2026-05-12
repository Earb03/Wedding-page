'use client';

import { usePathname } from 'next/navigation';

const youtubeVideoId = 's6SP5426pDc';

export default function AutoplayMusic() {
  const pathname = usePathname();

  if (pathname.startsWith('/a-e-panel')) {
    return null;
  }

  const src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&loop=1&playlist=${youtubeVideoId}&controls=0&mute=0&playsinline=1&rel=0&modestbranding=1`;

  return (
    <iframe
      className="autoplayMusic"
      src={src}
      title="Música de fondo"
      allow="autoplay; encrypted-media"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
