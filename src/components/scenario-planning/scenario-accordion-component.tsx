import { Card } from '#/components/ui/card';
import { AccordionContent } from '../ui/accordion';

interface AccordionSectionProps {
  scenario: string;
  strategy: string;
  confidenceLevel: string | number;
  implementationTime: string;
  cost: string | number;
}

export default function AccordionSection({
  scenario,
  strategy,
  confidenceLevel,
  implementationTime,
  cost
}: AccordionSectionProps) {
  return (
    <AccordionContent className='flex flex-col items-stretch gap-10 px-8 text-sm text-gray-600 lg:flex-row lg:px-16'>
      <Card className='flex h-fit flex-col items-start text-nowrap bg-white px-4 md:w-full md:items-center lg:w-[250px]'>
        <div className='border-b p-6 shadow-none md:w-full'>
          <h2 className='text-[14px] font-semibold text-gray-700 md:text-[16px] lg:text-[14px]'>
            Confidence Level
          </h2>
          <p className='mt-2 text-[18px] font-semibold text-black md:text-[20px] lg:text-[22px]'>
            {confidenceLevel}
          </p>
        </div>
        <div className='border-b p-6 shadow-none md:w-full'>
          <h2 className='text-[14px] font-semibold text-gray-700 md:text-[16px] lg:text-[14px]'>
            Time to Implement
          </h2>
          <p className='mt-2 text-[18px] font-semibold text-black md:text-[20px] lg:text-[22px]'>
            {implementationTime}
          </p>
        </div>
        <div className='border-b p-6 shadow-none md:w-full'>
          <h2 className='text-[14px] font-semibold text-gray-700 md:text-[16px] lg:text-[14px]'>
            Cost to Implement
          </h2>
          <p className='mt-2 text-[18px] font-semibold text-black md:text-[20px] lg:text-[22px]'>
            {cost}
          </p>
        </div>
      </Card>

      <div className='flex flex-col items-start gap-2 md:w-full lg:w-2/3'>
        <div className='mb-4'>
          <h2 className='mb-2 text-[16px] font-semibold text-gray-800'>
            Scenario
          </h2>
          <p className='text-[16px] text-gray-700 md:text-[18px]'>{scenario}</p>
        </div>

        <div>
          <h2 className='mb-2 text-[16px] font-semibold text-gray-800'>
            Mitigation Strategy
          </h2>
          <p className='text-[16px] text-gray-700 md:text-[18px]'>{strategy}</p>
        </div>
      </div>
    </AccordionContent>
  );
}
