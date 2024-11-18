import React, { useEffect, useRef, useState, useMemo } from 'react';
import { sectionsScenario } from '#/utils/utils';
import { Accordion, AccordionItem, AccordionTrigger } from '../ui/accordion';
import AccordionSection from './scenario-accordion-component';
import VerticalScenarioBar from './scenario-bar';
const ScenarioAccordionComponent = () => {
  const [openItem, setOpenItem] = useState<string>('item-1');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentHeights, setContentHeights] = useState<{
    [key: string]: number;
  }>({});

  const handleToggle = (value: string) => {
    setOpenItem(value);
  };

  // Calculate heights only when sections change or open item changes
  // useEffect(() => {
  //   const heights = sectionRefs.current.map((ref) =>
  //     ref ? ref.scrollHeight : 0
  //   );
  //   const newContentHeights = heights.reduce(
  //     (acc, height, index) => {
  //       acc[`item-${index + 1}`] = height;
  //       return acc;
  //     },
  //     {} as { [key: string]: number }
  //   );

  //   setContentHeights(newContentHeights);
  // }, [sections, openItem]);

  return (
    <div className='flex min-h-[78vh] flex-row rounded-b-lg bg-white p-6'>
      <VerticalScenarioBar
        activeAccordion={openItem}
        contentHeights={contentHeights}
      />
      <Accordion
        type='single'
        collapsible={false}
        defaultValue={openItem}
        className='pl-10'>
        {sectionsScenario.map((section, index) => {
          const itemValue = `item-${index + 1}`;
          const isActive = openItem === itemValue;
          return (
            <AccordionItem
              key={index}
              value={itemValue}
              className={`rounded-2xl ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'} mt-4 w-full`}
              onClick={() => handleToggle(itemValue)}>
              <AccordionTrigger
                className={`p-2 text-sm font-normal ${isActive ? 'font-bold text-black' : 'text-gray-500'} w-full`}>
                <div className='flex flex-col items-start gap-2 py-4 pl-6'>
                  <span className='text-xs text-gray-500'>{section.level}</span>
                  <h1
                    className={`text-[24px] ${isActive ? 'font-bold text-black' : 'font-semibolnpmd text-gray-500'}`}>
                    {section.title}
                  </h1>
                </div>
              </AccordionTrigger>
              <div
                ref={(el) => {
                  if (el) sectionRefs.current[index] = el;
                }}>
                <AccordionSection
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

export default ScenarioAccordionComponent;
