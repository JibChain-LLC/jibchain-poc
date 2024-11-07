'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createElement } from 'react';
import { Button } from '#/components/ui/button';

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme !== 'light' ? 'light' : 'dark');
  };

  return (
    <Button
      variant='ghost'
      className='rounded-[50%]'
      size={'icon'}
      onClick={toggleTheme}>
      {createElement(theme === 'light' ? Moon : Sun)}
    </Button>
  );
}
