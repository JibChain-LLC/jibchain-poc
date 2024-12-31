import Image from 'next/image';
import { type ReactNode } from 'react';
import Logo from '#/components/coeus-logo';
import { Card, CardContent } from '#/components/ui/card';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Image
        className='fixed -z-10 size-full object-cover brightness-50'
        src={'/shipping-containers.jpg'}
        width={1880}
        height={1253}
        alt=''
      />
      <Logo className='fixed top-11 z-0' width={210} />
      <Card className='z-10'>
        <CardContent className='px-6 py-8'>{children}</CardContent>
      </Card>
    </div>
  );
}
