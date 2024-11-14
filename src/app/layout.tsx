import 'server-only';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '#/components/header';
import ThemeProvider from '#/components/theme-provider';
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
    <html
      lang='en'
      className='min-h-screen bg-background'
      suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'grid min-h-screen grid-rows-[auto_1fr]'
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          <Header />
          <div id='main-content'>
            <Providers>{children}</Providers>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
