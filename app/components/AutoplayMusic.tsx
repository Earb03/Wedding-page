'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const audioSrc = '/audio/wedding-song.mp3';

export default function AutoplayMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startMusic = async () => {
      if (hasStartedRef.current) return;

      const audio = audioRef.current;
      if (!audio) return;

      try {
        audio.volume = 0.72;
        await audio.play();
        hasStartedRef.current = true;
        window.sessionStorage.setItem('weddingMusicStarted', 'true');
      } catch {
        // Browser still blocked playback; the next user interaction can try again.
      }
    };

    if (window.sessionStorage.getItem('weddingMusicStarted') === 'true') {
      window.setTimeout(startMusic, 250);
    }

    const initialScrollY = window.scrollY;
    let canUseScroll = false;

    const enableScrollTrigger = window.setTimeout(() => {
      canUseScroll = true;
    }, 600);

    const startFromScroll = () => {
      if (!canUseScroll) return;
      if (Math.abs(window.scrollY - initialScrollY) < 12) return;

      startMusic();
    };

    window.addEventListener('click', startMusic);
    window.addEventListener('touchstart', startMusic);
    window.addEventListener('keydown', startMusic);
    window.addEventListener('wheel', startMusic);
    window.addEventListener('scroll', startFromScroll);

    return () => {
      window.clearTimeout(enableScrollTrigger);
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('wheel', startMusic);
      window.removeEventListener('scroll', startFromScroll);
    };
  }, []);

  if (pathname.startsWith('/a-e-panel')) {
    return null;
  }

  return <audio ref={audioRef} src={audioSrc} preload="auto" loop />;
}
