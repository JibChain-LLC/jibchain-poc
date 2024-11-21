import type { Meta, StoryObj } from '@storybook/react';

import { Globe, Shield } from 'flowbite-react-icons/solid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue='account' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <p>account</p>
      </TabsContent>
      <TabsContent value='password'>
        <p>password</p>
      </TabsContent>
    </Tabs>
  )
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue='overview' className='w-[700px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='global'>
          <Globe />
          Global Impact
        </TabsTrigger>
        <TabsTrigger value='overview'>
          <Shield />
          Overview
        </TabsTrigger>
      </TabsList>
      <TabsContent value='global'>
        <p>Global Impact</p>
      </TabsContent>
      <TabsContent value='overview'>
        <p>Overview</p>
      </TabsContent>
    </Tabs>
  )
};

export const MixedTriggers: Story = {
  render: () => {
    const CustomTrigger = ({
      title,
      amount
    }: {
      title: string;
      amount: number;
    }) => {
      return (
        <div className='flex flex-col gap-0'>
          <span className='text-xs font-medium leading-tight'>{title}</span>
          <span className='text-3xl font-semibold leading-tight'>{amount}</span>
        </div>
      );
    };

    return (
      <Tabs defaultValue='high' className='w-[400px]'>
        <TabsList className='grid h-auto w-full grid-cols-3'>
          <TabsTrigger value='high' variant={'destructive'}>
            <CustomTrigger title='High Threat' amount={3} />
          </TabsTrigger>
          <TabsTrigger value='med' variant={'warning'}>
            <CustomTrigger title='Med. Threat' amount={7} />
          </TabsTrigger>
          <TabsTrigger value='low'>
            <CustomTrigger title='Low Threat' amount={10} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value='high'>
          <p>High</p>
        </TabsContent>
        <TabsContent value='med'>
          <p>Medium</p>
        </TabsContent>
        <TabsContent value='low'>
          <p>Low</p>
        </TabsContent>
      </Tabs>
    );
  }
};
