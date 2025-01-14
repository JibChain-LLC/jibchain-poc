'use client';

import { CameraOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Button } from '#/components/ui/button';
import { RiskCategoryEnum } from '#/enums';
import { impactAreaMapping } from '#/mappings';
import { RouteOutputs } from '#/trpc/query-clients/client';
import OverviewCard from './overview-card';

type RiskEntry = RouteOutputs['dash']['risks']['read'];

interface OverviewComponentProps {
  riskEntry: RiskEntry;
  setActiveTab: (value: string) => void;
}

const formatUSD = new Intl.NumberFormat('en-US', {
  notation: 'compact'
});

export default function OverviewComponent(props: OverviewComponentProps) {
  const { riskEntry, setActiveTab } = props;

  return (
    <div>
      <div className='mb-6 grid gap-4 lg:mb-12 lg:grid-cols-3'>
        <OverviewCard
          header='Financial Impact'
          subHeader={
            '$' + formatUSD.format(riskEntry.finanicalImpact!).toLowerCase()
          }
          src='/dollar.jpg'
          alt='Money'
        />
        <OverviewCard
          header='Probability'
          subHeader={Math.ceil(riskEntry.probability! * 100) + '%'}
          src='/zoom.jpg'
          alt='Graph'
        />
        <OverviewCard
          header='Impacted Suppliers'
          subHeader={riskEntry.impactedSuppliers.length.toString()}
          src='/overhead-containers.jpg'
          onClick={() => setActiveTab('global-impact')}
          alt='Suppliers'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2 lg:pr-5'>
          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Article Summary
          </p>
          <p className='mb-4 text-xl font-normal'>{riskEntry.title}</p>
          <Avatar className='mb-4 h-48 w-full rounded-xl'>
            <AvatarImage
              src={riskEntry.image!}
              className='rounded-none object-cover'
            />
            <AvatarFallback className='rounded-none bg-gray-200'>
              <CameraOff />
            </AvatarFallback>
          </Avatar>
          <p className='mb-4 text-base font-normal'>{riskEntry.summary}</p>

          <Button variant={'outline'} className='mb-8' asChild>
            <a href={riskEntry.url!} target='_blank'>
              Read Full Article
            </a>
          </Button>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Risk Mitigation Best Practice
          </p>
          <p className='mb-6 text-base font-normal'>{riskEntry.mitigation}</p>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Justification
          </p>
          <p className='text-base font-normal'>{riskEntry.justification}</p>
        </div>
        <div className='order-first flex h-fit flex-col gap-5 rounded-lg border border-gray-200 p-6 lg:order-last lg:col-span-1'>
          <p className='text-sm font-bold text-gray-600'>
            Potential Impact Areas
          </p>
          <div className='flex flex-col divide-y'>
            {impactAreaMapping[riskEntry.riskCategory as RiskCategoryEnum].map(
              (item, idx) => (
                <div
                  key={idx}
                  className='flex w-full items-center justify-center gap-2 border-gray-200 py-4 first:pt-0 last:pb-0'>
                  <div className='rounded-full bg-green-100 p-2'>
                    <item.icon className='size-4 text-green-700' />
                  </div>
                  <p className='w-full text-base font-normal'>{item.text}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
