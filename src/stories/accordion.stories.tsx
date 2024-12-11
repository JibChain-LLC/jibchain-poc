import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '#/components/ui/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Simple: Story = {
  render: () => (
    <Accordion type='single' collapsible={false}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Aspirational</AccordionTrigger>
        <AccordionContent>
          Ransomware attacks will become nearly obsolete due to advancements in
          quantum encryption and AI-Driven threat detection systems making it
          extremely difficult for attackers to infiltrate systems undetected.
          Patching and poor cybersecurity hygiene within suppliers will result
          in easily exploitable vulnerabilities.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Exploratory</AccordionTrigger>
        <AccordionContent>
          Lack of regular patching and poor cybersecurity hygiene within
          suppliers will result in easily exploitable vulnerabilities,
          increasing the frequency of data leaks and security breaches.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Remediation</AccordionTrigger>
        <AccordionContent>
          The lack of regular patching and poor cybersecurity hygiene within
          suppliers will result in easily exploitable vulnerabilities,
          increasing the frequency of data leaks and security breaches.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};
