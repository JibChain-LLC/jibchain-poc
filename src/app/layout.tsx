import 'server-only';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '#/components/header';
import ThemeProvider from '#/components/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { cn } from '#/lib/utils';
import Providers from './providers';
import Sidebar from '#/components/defaul-components/sidebar';

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
    <html lang='en' className='bg-background min-h-screen'>
      <body className={inter.className}>
        <div className='bg-gray-100'>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <div className='flex h-screen relative'>
              <Sidebar />
              <div className='w-full bg-gray-100 pr-4 container'>
                <div id='main-content'>{children}</div>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
