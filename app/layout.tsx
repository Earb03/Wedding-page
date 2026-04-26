import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pinyonScript = localFont({
  src: './fonts/PinyonScript-Regular.ttf',
  variable: '--font-script',
  display: 'swap',
});

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
      <body className={pinyonScript.variable}>{children}</body>
    </html>
  );
}