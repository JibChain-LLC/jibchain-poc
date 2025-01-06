'use client';
import { Eye, Shield, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '#/components/ui/button';
import { trpc } from '#/trpc/query-clients/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './scenario-accordion';

const ScenarioAccordion = () => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];
  const { data, isLoading } = trpc.dash.risks.read.useQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (!data?.planning) return null;

  const icons = {
    1: Shield,
    2: Eye,
    3: Star
  } as const;

  const levels = {
    1: 'Remediation',
    2: 'Exploratory',
    3: 'Aspirational'
  } as const;

  const planningArray = Object.entries(data.planning).map(([key, value]) => ({
    title: levels[Number(key) as 1 | 2 | 3],
    level: `Level ${key}`,
    icon: icons[Number(key) as 1 | 2 | 3],
    scenario: value.scenario,
    strategy: value.strategy,
    confidenceLevel: `${Math.round(value.confidence * 100)}%`,
    implementationTime: `${value.implementationTime} Months`,
    cost: `$${(value.cost / 1000000).toFixed(1)}m`
  }));
  return (
    <Accordion
      type='single'
      className='mt-5 w-full'
      defaultValue={planningArray[0].title}>
      {planningArray.map((scenarioItem) => {
        const {
          title,
          level,
          scenario,
          strategy,
          confidenceLevel,
          implementationTime,
          cost,
          icon
        } = scenarioItem;

        const sideCard = [
          { label: 'Confidence level', value: confidenceLevel },
          { label: 'Time to implement', value: implementationTime },
          { label: 'Cost to implement', value: cost }
        ] as const;

        const content = [
          { title: 'Scenario', body: scenario },
          { title: 'Mitigation Strategy', body: strategy }
        ] as const;

        return (
          <AccordionItem key={title} value={title} icon={icon}>
            <AccordionTrigger title={level} subTitle={title} />
            <AccordionContent>
              <div className='flex gap-8 px-5'>
                <div className='flex h-fit w-[208px] shrink-0 flex-col gap-10 rounded-md border border-gray-300 bg-white px-6 py-4'>
                  {sideCard.map(({ label, value }, idx) => (
                    <div key={idx}>
                      <p className='text-sm font-semibold text-gray-600'>
                        {label}
                      </p>
                      <p className='text-xl font-semibold'>{value}</p>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-8'>
                  {content.map(({ title, body }, idx) => {
                    return (
                      <div key={idx}>
                        <h4 className='text-sm font-semibold text-gray-500'>
                          {title}
                        </h4>
                        <p className='text-base font-normal'>{body}</p>
                      </div>
                    );
                  })}
                  <div className='flex flex-col gap-1.5'>
                    <p className='text-base font-medium'>
                      In need of further planning?
                    </p>
                    <div className='flex gap-1.5'>
                      <Button>Contact JibChain</Button>
                      <Button variant={'outline'}>Copy Email Address</Button>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ScenarioAccordion;
