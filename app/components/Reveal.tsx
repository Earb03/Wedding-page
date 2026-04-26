'use client';

import {
  ElementType,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

type RevealProps = PropsWithChildren<
  React.HTMLAttributes<HTMLElement> & {
    as?: ElementType;
    delay?: number;
    once?: boolean;
  }
>;

export default function Reveal({
  as: Component = 'div',
  delay = 0,
  once = false,
  className = '',
  children,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -80px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once]);

  return (
    <Component
      ref={ref}
      className={`reveal ${isVisible ? 'isVisible' : ''} ${className}`}
      style={{ ...style, '--delay': `${delay}ms` } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}