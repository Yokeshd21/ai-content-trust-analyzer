import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'AI Content Trust Analyzer | Detect Misinformation',
  description: 'Detect AI-generated content, misinformation, and fake news instantly with production-quality AI analysis.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground min-h-screen selection:bg-indigo-500/30`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
