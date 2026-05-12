'use client';

import { useState } from 'react';

type MobileMenuLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  links: MobileMenuLink[];
};

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

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
        <button
          type="button"
          className="mobileMenuScrim"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        />

        <aside className="mobileMenuPanel" aria-hidden={!isOpen}>
          <div className="mobileMenuHeader">
            <p>Aritza & Edward</p>
            <button type="button" onClick={closeMenu} aria-label="Cerrar menú">
              ×
            </button>
          </div>

          <nav className="mobileMenuLinks">
            {links.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
