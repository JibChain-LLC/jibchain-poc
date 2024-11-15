// accordion-list-component.tsx
import { Accordion } from '#/components/ui/accordion';
import AccordionItemContent from './accordion-item-content';

interface Section {
  title: string;
  level: string;
  scenario: string;
  strategy: string;
  confidenceLevel: string;
  implementationTime: string;
  cost: string;
}

interface AccordionListProps {
  sections: Section[]; // Change to Section[]
}

export default function AccordionList({ sections }: AccordionListProps) {
  return (
    <Accordion
      type='single'
      collapsible
      className='space-y-16'
      defaultValue='item-1'>
      {sections.map((section, index) => (
        <AccordionItemContent
          key={index}
          section={section}
          value={`item-${index + 1}`}
        />
      ))}
    </Accordion>
  );
}
