// AccordionItemContent.jsx
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '#/components/ui/accordion';

interface Section {
  title: string;
  level: string;
  scenario: string;
  strategy: string;
  confidenceLevel: string;
  implementationTime: string;
  cost: string;
}

interface AccordionItemContentProps {
  section: Section;
  value: string;
}
export default function AccordionItemContent({
  section,
  value
}: AccordionItemContentProps) {
  const {
    title,
    level,
    scenario,
    strategy,
    confidenceLevel,
    implementationTime,
    cost
  } = section;

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className='p-2 text-sm font-normal text-gray-700'>
        <div className='ml-2 flex flex-col items-start gap-2'>
          <span className='text-xs text-gray-500'>{level}</span>
          <h1 className='text-[24px] font-semibold text-black'>{title}</h1>
        </div>
      </AccordionTrigger>
      <AccordionContent className='p-4 text-gray-600'>
        <div className='flex flex-col items-start justify-around gap-10'>
          <div>
            <h2 className='my-2 text-[18px] font-semibold'>Scenario</h2>
            <p className='text-[16px] font-semibold'>{scenario}</p>
          </div>
          <div>
            <h2 className='my-2 text-[18px] font-semibold'>
              Mitigation Strategy
            </h2>
            <p className='mb-5 text-[16px] font-semibold text-black'>
              {strategy}
            </p>
          </div>
        </div>
        <div className='mt-4 flex flex-row items-center justify-between'>
          <div className='flex flex-col items-start gap-2'>
            <h2 className='text-[14px] font-semibold'>Confidence Level</h2>
            <h1 className='text-[24px] font-semibold text-black'>
              {confidenceLevel}
            </h1>
            <h2 className='text-[14px] font-semibold'>See Case Study</h2>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h2 className='text-[14px] font-semibold'>
              Estimated Time To Implement
            </h2>
            <h1 className='text-[24px] font-semibold text-black'>
              {implementationTime}
            </h1>
            <h1>{''}</h1>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h2 className='text-[14px] font-semibold'>
              Estimated Cost To Implement
            </h2>
            <h1 className='text-[24px] font-semibold text-black'>{cost}</h1>
          </div>
          <h1>{''}</h1>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
