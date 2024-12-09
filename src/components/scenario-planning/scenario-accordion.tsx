'use client';
import React, { useState } from 'react';
import { cn } from '#/lib/utils';
import { sectionsScenario } from '#/utils/utils';
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ScenarioDetails from './scenario-details';

const ScenarioAccordion = () => {
  const [openItem, setOpenItem] = useState<string>('item-1');

  return (
    <div className='flex min-h-[78vh] flex-col items-center rounded-b-lg bg-white p-4'>
      <Accordion
        type='single'
        collapsible={false}
        value={openItem}
        onValueChange={(value) => setOpenItem(value || openItem)}
        className='size-full'>
        {sectionsScenario.map((section, index) => {
          const itemValue = `item-${index + 1}`;
          const isActive = openItem === itemValue;
          const isLastItem = index === sectionsScenario.length - 1;
          return (
            <AccordionItem
              key={index}
              value={itemValue}
              className='flex h-full flex-row items-start gap-4 rounded-2xl p-2'>
              <div className='relative flex h-full flex-col items-center'>
                <div
                  className={cn(
                    'mt-6 flex items-center justify-center rounded-full p-3',
                    isActive ? 'bg-green-100' : 'bg-gray-100'
                  )}>
                  <section.icon className='size-4' />
                </div>

                {!isLastItem && (
                  <div
                    className={cn(
                      'absolute left-1/2 top-full w-[2px] bg-gray-300',
                      isActive ? 'h-[460px]' : 'h-[100px]'
                    )}></div>
                )}
              </div>

              <div
                className={cn(
                  'flex-1 rounded-lg p-3',
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-100'
                )}>
                <AccordionTrigger
                  className={cn(
                    'flex items-center rounded-full p-4 text-sm font-normal',
                    isActive ? 'font-bold text-black' : 'text-gray-500'
                  )}>
                  <div className='flex flex-col items-start gap-2'>
                    <span className='text-xs text-gray-500'>
                      {section.level}
                    </span>
                    <h1
                      className={cn(
                        'text-[24px]',
                        isActive ? 'font-bold text-black' : 'text-gray-500'
                      )}>
                      {section.title}
                    </h1>
                  </div>
                </AccordionTrigger>
                <ScenarioDetails
                  scenario={section.scenario}
                  strategy={section.strategy}
                  confidenceLevel={section.confidenceLevel}
                  implementationTime={section.implementationTime}
                  cost={section.cost}
                />
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ScenarioAccordion;
