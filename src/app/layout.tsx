import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '#/components/custom';
import { ThemeProvider } from '#/components/theme-provider';
import { Toaster } from '#/components/ui/toaster';
import { cn } from '#/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-background min-h-screen'>
      <body
        className={cn(
          inter.className,
          'grid grid-rows-[auto_1fr] min-h-screen'
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <Header />
          <div id='main-content'>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
