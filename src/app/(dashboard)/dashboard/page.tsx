import Image from 'next/image';
import React from 'react';
import AuthWrapper from '#/components/auth-wrapper';
import { Button } from '#/components/ui/button';
import { Card } from '#/components/ui/card';
import { dashboardCardData } from '#/utils/utils';
import RiskContainer from './_components/risk-container';

export default async function DashboardPage() {
  return (
    <div className='grid grid-cols-1 pt-4 lg:grid-cols-7'>
      <div className='flex flex-col space-y-6 lg:col-span-5'>
        <AuthWrapper fallback={<p>Loading...</p>}>
          {({ user }) => {
            const firstName = user.user_metadata?.firstName || '';
            const lastName = user.user_metadata?.lastName || '';
            return (
              <h1 className='text-2xl font-semibold lg:text-3xl'>
                Welcome, {firstName} {lastName}
              </h1>
            );
          }}
        </AuthWrapper>
        <div className='flex flex-col items-start gap-3'>
          <h3 className='text-lg font-medium text-gray-700 lg:text-xl'>
            Featured News
          </h3>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {dashboardCardData.map((card, index) => (
              <Card key={index} className='overflow-hidden rounded-xl bg-white'>
                <Image
                  src={card.image}
                  alt='Feature'
                  className='h-32 w-full object-cover lg:h-48'
                  width={400}
                  height={400}
                />
                <div className='flex flex-col p-4'>
                  <p className='mb-4 text-base font-medium text-gray-700 lg:text-sm'>
                    {card.description}
                  </p>
                  <Button className='w-28' variant='outline'>
                    {card.buttonText}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className='relative min-h-[300px] w-full overflow-hidden rounded-xl lg:min-h-[390px]'>
          <Image
            src={`/jumbotron.jpg`}
            alt='Operational Resilience'
            className='absolute size-full object-cover'
            width={400}
            height={400}
          />
          <div className='absolute inset-0 bg-black opacity-70'></div>
          <div className='relative flex h-full items-center justify-center px-4 py-6 text-white'>
            <div className='text-center'>
              <h1 className='text-lg font-bold sm:text-xl md:text-2xl lg:text-5xl'>
                Operational Resilience with AI
              </h1>
              <p className='mx-auto mt-2 max-w-4xl text-sm sm:mt-4 sm:text-base md:text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae fugit possimus sunt nobis doloremque consequuntur!
              </p>
              <Button
                className='mt-4 px-4 py-2 lg:px-6 lg:py-3'
                variant='default'>
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className='h-full lg:col-span-2 lg:p-4 lg:pl-10'>
        <RiskContainer />
      </div>
    </div>
  );
}
