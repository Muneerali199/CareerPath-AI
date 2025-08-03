import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CareerPath AI - Student Career Guidance Platform',
  description: 'AI-powered career guidance platform with three specialized agents to guide students from college to career success. Powered by IBM Watson X.',
  keywords: 'career guidance, AI career advisor, job search, skill development, resume builder, IBM Watson X',
  authors: [{ name: 'CareerPath AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
  openGraph: {
    title: 'CareerPath AI - Student Career Guidance Platform',
    description: 'AI-powered career guidance with specialized agents for career choice, skill development, and resume building.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}