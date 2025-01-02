'use client';

import { Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '#/components/ui/accordion';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '#/components/ui/select';
import { SheetContent, SheetHeader, SheetTitle } from '#/components/ui/sheet';
import { RiskCategoryEnum } from '#/enums';
import { trpc } from '#/trpc/query-clients/client';
import { BADGE_MAP } from './risk-table';

interface RiskSheetProps {
  id: string;
  setSheetOpen: (b: boolean) => void;
}

function ItemLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-sm font-medium uppercase text-gray-500'>{children}</p>
  );
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function RiskSheet(props: RiskSheetProps) {
  const { id, setSheetOpen } = props;
  const { data, isPending } = trpc.dash.risks.read.useQuery(id);

  return (
    <SheetContent
      className='flex h-screen w-[850px] flex-col overflow-y-auto p-0'
      onEscapeKeyDown={() => setSheetOpen(false)}
      onInteractOutside={() => setSheetOpen(false)}>
      <SheetHeader className='sticky top-0 mb-0 flex-none border border-b-gray-200 bg-gray-50 px-6 pb-2 pt-6'>
        <SheetTitle>Edit Risk Entry</SheetTitle>
      </SheetHeader>
      {isPending && (
        <div className='flex grow items-center justify-center'>
          <Loader2 size={48} className='animate-spin text-green-600' />
        </div>
      )}
      {!isPending && data && (
        <div className='flex grow flex-col gap-4 px-6'>
          <div className='flex items-center gap-1'>
            <Badge variant={'secondary'}>
              ID: <code>{data.id}</code>
            </Badge>
            <Badge variant={'secondary'}>
              Model Used: <code>{data.modelUsed}</code>
            </Badge>
            <Badge variant={BADGE_MAP[data.riskLevel!].variant}>
              Risk Level: {BADGE_MAP[data.riskLevel!].text}
            </Badge>
          </div>
          <div>
            <p className='text-xl font-bold'>{data.title}</p>
            {data.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.image}
                alt={data.title!}
                className='mb-3 h-[200px] w-full rounded-md object-cover'
              />
            )}
            <p className='text-sm'>{data.summary}</p>
            {data.url && (
              <a
                href={data.url}
                target='_blank'
                className='text-sm text-green-600 hover:underline'>
                Read Full Article
              </a>
            )}
          </div>
          <div>
            <ItemLabel>Best Practices</ItemLabel>
            <p className='text-sm'>{data.mitigation}</p>
          </div>
          <div>
            <ItemLabel>Justification</ItemLabel>
            <p className='text-sm'>{data.justification}</p>
          </div>
          <div>
            <ItemLabel>Category</ItemLabel>
            <Select defaultValue={data.riskCategory!}>
              <SelectTrigger defaultValue={data.riskCategory!} />
              <SelectContent>
                {Object.values(RiskCategoryEnum).map((c) => (
                  <SelectItem value={c} key={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <ItemLabel>Scenario Planning</ItemLabel>
            <Accordion type='single' collapsible className='w-full'>
              {data.scenarios.map((scen) => {
                const {
                  id,
                  level,
                  strategy,
                  scenario,
                  confidence,
                  implementationTime,
                  cost
                } = scen;

                return (
                  <AccordionItem value={id} key={id}>
                    <AccordionTrigger className='capitalize'>
                      {level}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div>
                          <p className='font-semibold'>Scenario</p>
                          <p className='mb-4'>{scenario}</p>
                          <p className='font-semibold'>Strategy</p>
                          <p>{strategy}</p>
                        </div>
                        <div className='h-fit rounded-md border border-gray-300 p-3'>
                          <p>
                            Confidence: <b>{Math.ceil(confidence!) * 100}%</b>
                          </p>
                          <p>
                            Time to Implement:{' '}
                            <b>{implementationTime} months</b>
                          </p>
                          <p>
                            Cost: <b>{usdFormatter.format(cost!)}</b>
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      )}

      <div className='sticky bottom-0 flex flex-none gap-2 border border-t-gray-200 bg-gray-50 p-6'>
        <Button>Save Changes</Button>
        <Button variant={'outline'} onClick={() => setSheetOpen(false)}>
          Cancel
        </Button>
        <Button variant={'destructive'}>Delete Entry</Button>
      </div>
    </SheetContent>
  );
}
