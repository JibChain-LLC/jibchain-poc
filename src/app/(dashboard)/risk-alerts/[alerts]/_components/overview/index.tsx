'use client';

import Image from 'next/image';
import { Button } from '#/components/ui/button';
import { mitigationBestPractices, overviewCardData } from '#/utils/utils';
import OverviewCard from './overview-card';

export default function OverviewComponent() {
  return (
    <div>
      <div className='mb-6 grid gap-4 lg:mb-12 lg:grid-cols-3'>
        <OverviewCard
          header={overviewCardData[0].title}
          src={overviewCardData[0].icon}
          alt={overviewCardData[0].alt}
          subHeader={overviewCardData[0].value}
        />
        <OverviewCard
          header={overviewCardData[1].title}
          subHeader={overviewCardData[1].value}
          src={overviewCardData[1].icon}
          alt={overviewCardData[1].alt}
        />
        <OverviewCard
          header={overviewCardData[2].title}
          subHeader={overviewCardData[2].value}
          src={overviewCardData[2].icon}
          onClick={() => console.log('test')}
          alt={overviewCardData[2].alt}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2 lg:pr-5'>
          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Article Summary
          </p>
          <p className='mb-4 text-xl font-normal'>
            Ransomware attacks continue to evolve and target organizations
            across various sectors
          </p>

          <Image
            src='/laptop.jpg'
            alt='article image'
            width={300}
            height={400}
            className='mb-4 h-48 w-full rounded-xl object-cover'
          />

          <p className='mb-4 text-base font-normal'>
            Implement robust backup systems, conduct regular security awareness
            training, and develop a comprehensive incident response plan that
            doesn&apos;t involve paying ransoms.
          </p>

          <Button variant={'outline'} className='mb-8'>
            Read Full Article
          </Button>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Risk Mitigation Best Practice
          </p>
          <p className='mb-6 text-base font-normal'>
            Implement robust backup systems, conduct regular security awareness
            training, and develop a comprehensive incident response plan that
            doesn&apos;t involve paying ransoms.
          </p>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Justification
          </p>
          <p className='text-base font-normal'>
            The Verizon 2023 Data Breach Investigations Report indicates that
            ransomware has maintained its prevalence, involved in 24% of all
            breaches. The report also notes a 13% increase in ransomware
            incidents compared to the previous year.
          </p>
        </div>
        <div className='order-first flex h-fit flex-col gap-5 rounded-lg border border-gray-200 p-6 lg:order-last lg:col-span-1'>
          <p className='text-sm font-bold text-gray-600'>
            Potential Impact Areas
          </p>
          <div className='flex flex-col divide-y'>
            {mitigationBestPractices.map((item, index) => (
              <div
                key={index}
                className='flex w-full items-center justify-center gap-2 border-gray-200 py-4 first:pt-0 last:pb-0'>
                <div className='rounded-full bg-green-100 p-2'>
                  <item.icon className='size-4 text-green-700' />
                </div>
                <p className='w-full text-base font-normal'>{item.label}</p>
              </div>
            ))}
          </div>
          <Button variant={'outline'} className='w-full'>
            Contact JibChain
          </Button>
        </div>
      </div>
    </div>
  );
}
