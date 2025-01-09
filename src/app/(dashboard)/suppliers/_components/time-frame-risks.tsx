'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import TimeFrame from '#/components/defaul-components/time-frame';
import { Card, CardContent } from '#/components/ui/card';
import { trpc } from '#/trpc/query-clients/client';

interface TimeFrameRisksProps {
  endDate: number;
}

const ONE_DAY_MS = 86_400_000;

export default function TimeFrameRisks(props: TimeFrameRisksProps) {
  const { endDate } = props;

  const [timeRange, setTimeRange] =
    useState<React.ComponentProps<typeof TimeFrame>['startValue']>('live');

  const [startDate, setStartDate] = useState<number>(endDate - ONE_DAY_MS);
  const { data, isPending } = trpc.dash.risks.list.useQuery({
    range: { startDate: startDate, endDate: endDate }
  });

  useEffect(() => {
    let start = endDate;

    switch (timeRange) {
      case '48-hours':
        start = start - ONE_DAY_MS * 2;
        break;
      case '4-days':
        start = start - ONE_DAY_MS * 4;
        break;
      case 'this-month':
        start = start - ONE_DAY_MS * 30;
        break;
      default:
        start = start - ONE_DAY_MS;
        break;
    }

    setStartDate(start);
  }, [timeRange, endDate]);

  return (
    <Card className='flex w-full grow flex-col items-center justify-center'>
      <CardContent className='flex size-full flex-col gap-7 px-5'>
        <TimeFrame className='w-full' onValueChange={(v) => setTimeRange(v)} />
        {!isPending && (
          <div className='flex w-full justify-between'>
            <div className='flex flex-col gap-0.5'>
              <p className='text-xs font-medium leading-tight text-gray-500'>
                Overall risk status
              </p>
              <p className='text-2xl font-bold leading-tight text-orange-600'>
                Medium
              </p>
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-xs font-medium leading-tight text-gray-500'>
                Active risks
              </p>
              <p className='text-2xl font-bold leading-tight'>{data?.total}</p>
            </div>
          </div>
        )}
        {isPending && (
          <div className='flex size-full items-center justify-center'>
            <Loader2 className='size-8 animate-spin text-gray-300' />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
