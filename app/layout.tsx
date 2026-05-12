import type { Metadata } from 'next';
import AutoplayMusic from './components/AutoplayMusic';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aritza & Edward — Junio 20, 2026',
  description: 'Nos casamos y queremos compartir este día contigo.',
  openGraph: {
    title: 'Aritza & Edward — Junio 20, 2026',
    description: 'Nos casamos y queremos compartir este día contigo.',
    type: 'website',
    images: ['/images/hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <AutoplayMusic />
      </body>
    </html>
  );
}
