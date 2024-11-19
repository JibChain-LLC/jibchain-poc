import 'server-only';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '#/components/ui/toaster';
import { cn } from '#/lib/utils';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: 'JibChain COEUS - %s',
    default: 'JibChain COEUS'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='min-h-screen'>
      <body className={cn(inter.className, 'bg-gray-50')}>
        <div id='main-content'>
          <Providers>{children}</Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
