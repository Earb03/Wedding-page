'use client';

import { useEffect, useState } from 'react';

type MobileMenuLink = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

type MobileMenuProps = {
  links: MobileMenuLink[];
};

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const standardLinks = links.filter((link) => !link.isPrimary);
  const primaryLinks = links.filter((link) => link.isPrimary);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="mobileMenuToggle"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobileMenuBackdrop ${isOpen ? 'isOpen' : ''}`}>
        <section className="mobileMenuPanel" aria-hidden={!isOpen}>
          <div className="mobileMenuHeader">
            <p>Aritza & Edward</p>
            <button type="button" onClick={closeMenu} aria-label="Cerrar menú">
              ×
            </button>
          </div>

          <nav className="mobileMenuLinks" aria-label="Menú principal">
            {standardLinks.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobileMenuActions">
            {primaryLinks.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="mobileMenuDate">Junio 20, 2026</p>
        </section>
      </div>
    </>
  );
}
