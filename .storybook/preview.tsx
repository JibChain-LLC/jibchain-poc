import * as React from 'react';
import type { Preview } from '@storybook/react';
import '#/app/globals.css'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={inter.className}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
