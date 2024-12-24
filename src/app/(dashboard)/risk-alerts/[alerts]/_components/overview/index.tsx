'use client';

import { Button } from '#/components/ui/button';
import { formatNumber, formatPercentage, mitigationBestPractices, overviewCardData } from '#/utils/utils';
import { usePathname } from 'next/navigation';
import OverviewCard from './overview-card';
import { RouteOutputs, trpc } from '#/trpc/query-clients/client';
import { useState } from 'react';
import { TimeValue } from '#/components/defaul-components/time-frame';
import { useRouter } from 'next/navigation';

type RiskListRes = RouteOutputs['dash']['risks']['list'];
interface TimeProps {
  timeValue?: TimeValue;
  startDate: number;
  endDate: number;
}
const ONE_DAY_MS = 86_400_000;


export default function OverviewComponent() {
  // const { timeValue: t, startDate: s, endDate } = props;
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  // const [startDate, setStartDate] = useState<number>(s);
  // const [timeValue, setTimeValue] = useState<TimeValue>(t ?? 'live');
  // const [riskList, setRiskList] = useState<RiskListRes>();
  const { data } = trpc.dash.risks.read.useQuery(id)
  console.log('data',data)
  return (
    <div>
      <div className='mb-6 grid gap-4 lg:mb-12 lg:grid-cols-3'>
        <OverviewCard
          header={overviewCardData[0].title}
          src={overviewCardData[0].icon}
          alt={overviewCardData[0].alt}
          subHeader={formatNumber(data?.financialImpact)}
        />
        <OverviewCard
          header={overviewCardData[1].title}
          subHeader={formatPercentage(data?.probability)}
          src={overviewCardData[1].icon}
          alt={overviewCardData[1].alt}
        />
        <OverviewCard
          header={overviewCardData[2].title}
          subHeader={data?.impactedSuppliers?.length!}
          src={overviewCardData[2].icon}
          onClick={() => console.log('test')}
          alt={overviewCardData[2].alt}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-2 lg:pr-5'>
          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
              {data?.summary?.title}
          </p>
          <p className='mb-4 text-xl font-normal'>
            {data?.summary?.bodyText}
          </p>

          <img
            src='/laptop.jpg'
            alt='article image'
            className='mb-4 h-48 w-full rounded-xl object-cover'></img>

          {/* <p className='mb-4 text-base font-normal'>
            Implement robust backup systems, conduct regular security awareness
            training, and develop a comprehensive incident response plan that
            doesn&apos;t involve paying ransoms.
          </p> */}

          <Button variant={'outline'} onClick={()=> router.push(`${data?.summary?.url}`)} className='mb-8'>
            Read Full Article
          </Button>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            {data?.category} Best Practice
          </p>
          <p className='mb-6 text-base font-normal'>
           {data?.bestPractice}
          </p>

          <p className='mb-0.5 text-xs font-semibold text-gray-500'>
            Justification
          </p>
          <p className='text-base font-normal'>
            {data?.justification}
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
