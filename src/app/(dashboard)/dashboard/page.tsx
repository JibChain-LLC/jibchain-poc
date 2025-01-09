/* eslint-disable @next/next/no-img-element */
import 'server-only';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthWrapper from '#/components/auth-wrapper';
import { Button } from '#/components/ui/button';
import { Card } from '#/components/ui/card';
import { db } from '#/db';
import RiskContainer from './_components/risk-container';

export default async function DashboardPage() {
  const latestNews = await db.query.risks.findMany({
    columns: {
      title: true,
      image: true,
      id: true,
      articleDate: true
    },
    orderBy: (r, { desc }) => desc(r.articleDate),
    limit: 3
  });

  return (
    <div>
      <AuthWrapper fallback={<p>Loading...</p>}>
        {({ user }) => {
          const firstName = user.user_metadata?.firstName || '';
          const lastName = user.user_metadata?.lastName || '';
          return (
            <h1 className='mb-7 text-2xl font-semibold text-gray-900'>
              Welcome, {firstName} {lastName}
            </h1>
          );
        }}
      </AuthWrapper>
      <div className='grid grid-cols-1 lg:grid-cols-7'>
        <div className='flex flex-col gap-4 lg:col-span-5'>
          <div className='flex flex-col items-start gap-2'>
            <h3 className='text-base font-medium'>Featured News</h3>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {latestNews.map((card) => (
                <Card key={card.id} className='flex flex-col overflow-hidden'>
                  <img
                    src={card.image!}
                    alt='Feature'
                    className='h-32 w-full object-cover lg:h-48'
                    width={400}
                    height={400}
                  />
                  <div className='flex grow flex-col justify-between p-4'>
                    <p className='mb-4 text-base font-medium leading-tight'>
                      {card.title}
                    </p>
                    <Button className='w-fit' variant='outline' asChild>
                      <Link href={`/risk-alerts/${card.id}`}>Read More</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className='relative min-h-[300px] w-full overflow-hidden lg:min-h-[390px]'>
            <Image
              src={`/jumbotron.jpg`}
              alt='Operational Resilience'
              className='absolute size-full object-cover brightness-[.25]'
              width={400}
              height={400}
            />

            <div className='relative flex h-full items-center justify-center px-4 py-6 text-white'>
              <div className='flex flex-col items-center justify-center gap-6 text-center'>
                <h1 className='text-lg font-bold sm:text-xl md:text-2xl lg:text-5xl'>
                  Operational Resilience with AI
                </h1>
                <p className='mx-auto max-w-4xl text-sm font-normal text-gray-300 sm:text-base md:text-lg lg:text-xl'>
                  Intelligently designed risk management for the future
                </p>
                <Button variant='default' className='w-fit' asChild>
                  <a href='https://coeusrisk.ai/'>Learn More</a>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className='h-full lg:col-span-2 lg:pl-4'>
          <RiskContainer />
        </div>
      </div>
    </div>
  );
}
