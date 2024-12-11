'use client';
import { Eye, Shield, Star } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './scenario-accordion';

export const sectionsScenario = [
  {
    title: 'Aspirational',
    level: 'Level 3',
    icon: Star,
    scenario:
      'Ransomware attacks will become nearly obsolete due to advancements in quantum encryption and AI-Driven threat detection systems making it extremely difficult for attackers to infiltrate systems undetected. Patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities.',
    strategy:
      'Invest in quantum encryption and AI-based cybersecurity tools to protect against ransomware attacks. The document highlights strong encryption and proactive risk management patching and poor cybersecurity hygiene within suppliers as essential components of ransomware defense.',
    confidenceLevel: 'Medium (60%)',
    implementationTime: '3 Months',
    cost: '$1.2m'
  },
  {
    title: 'Exploratory',
    level: 'Level 2',
    icon: Eye,
    scenario:
      'Lack of regular patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities, increasing the frequency of data leaks and security breaches.',
    strategy:
      'The document emphasizes the importance of enforcing basic cyber hygiene, such as regular patching, security training, and monitoring of internal systems. Implement mandatory patch management schedules and train staff on security awareness to mitigate vulnerabilities.',
    confidenceLevel: 'High (80%)',
    implementationTime: '6 Months',
    cost: '$2.5m'
  },
  {
    title: 'Remediation',
    level: 'Level 1',
    icon: Shield,
    scenario:
      'The lack of regular patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities, increasing the frequency of data leaks and security breaches.',
    strategy:
      'The document emphasizes the importance of enforcing basic cyber hygiene, such as regular patching, security training, and monitoring of internal systems. Implement mandatory patch management schedules and train staff on security awareness to mitigate vulnerabilities.',
    confidenceLevel: 'High (70%)',
    implementationTime: '2 Months',
    cost: '$3m'
  }
] as const;

const ScenarioAccordion = () => {
  return (
    <Accordion
      type='single'
      className='mt-5 w-full'
      defaultValue={sectionsScenario[0].title}>
      {sectionsScenario.map((scenarioItem) => {
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
          { label: 'Time to implemenet', value: implementationTime },
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
