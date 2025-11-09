import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI-Accelerated Software Engineering Course',
  description:
    'Learn to code, ship polished products, and pass interviews faster with an AI-first learning plan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050816] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
