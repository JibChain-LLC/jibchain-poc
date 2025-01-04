'use client';

import { Eye, LucideIcon, Shield, Star } from 'lucide-react';
import React from 'react';
import { ScenarioLevelEnum } from '#/enums';
import { type RouteOutputs } from '#/trpc/query-clients/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './scenario-accordion';

type RiskEntry = RouteOutputs['dash']['risks']['read'];

interface ScenarioAccordionProps {
  riskEntry: RiskEntry;
}

const ICON_MAP: Record<ScenarioLevelEnum, LucideIcon> = {
  aspirational: Star,
  exploratory: Eye,
  remediation: Shield
};

const formatUSD = new Intl.NumberFormat('en-US', {
  notation: 'compact'
});

const ScenarioAccordion = (props: ScenarioAccordionProps) => {
  const { riskEntry } = props;

  return (
    <Accordion
      type='single'
      className='mt-5 w-full'
      defaultValue={riskEntry.scenarios[0].level!}>
      {riskEntry.scenarios.map((scenarioItem, idx) => {
        const {
          level,
          scenario,
          strategy,
          confidence,
          implementationTime,
          cost
        } = scenarioItem;

        const icon = ICON_MAP[level!];

        const sideCard = [
          {
            label: 'Confidence level',
            value: Math.ceil(confidence! * 100) + '%'
          },
          {
            label: 'Time to implement',
            value: implementationTime + ' months'
          },
          {
            label: 'Cost to implement',
            value: '$' + formatUSD.format(cost!).toLowerCase()
          }
        ] as const;

        const content = [
          { title: 'Scenario', body: scenario },
          { title: 'Mitigation Strategy', body: strategy }
        ] as const;

        return (
          <AccordionItem key={level} value={level!} icon={icon}>
            <AccordionTrigger
              title={`Level ${idx + 1}`}
              subTitle={level!}
              className='capitalize'
            />
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
