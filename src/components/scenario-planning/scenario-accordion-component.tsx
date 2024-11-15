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
    <AccordionContent className='text-sm text-gray-600 flex flex-col lg:flex-row items-stretch gap-10 px-8 lg:px-16'>
      <Card className='flex flex-col items-start md:items-center bg-white px-4 md:w-full lg:w-[250px] h-fit text-nowrap'>
        <div className='p-6 md:w-full  border-b shadow-none'>
          <h2 className='font-semibold text-gray-700 text-[14px] md:text-[16px] lg:text-[14px]'>
            Confidence Level
          </h2>
          <p className='text-black text-[18px] md:text-[20px] lg:text-[22px] font-semibold mt-2'>
            {confidenceLevel}
          </p>
        </div>
        <div className='p-6 border-b shadow-none md:w-full'>
          <h2 className='font-semibold text-gray-700 text-[14px] md:text-[16px] lg:text-[14px]'>
            Time to Implement
          </h2>
          <p className='text-black text-[18px] md:text-[20px] lg:text-[22px] font-semibold mt-2'>
            {implementationTime}
          </p>
        </div>
        <div className='p-6 border-b shadow-none md:w-full'>
          <h2 className='font-semibold text-gray-700 text-[14px] md:text-[16px] lg:text-[14px]'>
            Cost to Implement
          </h2>
          <p className='text-black text-[18px] md:text-[20px] lg:text-[22px] font-semibold mt-2'>
            {cost}
          </p>
        </div>
      </Card>

      <div className='flex flex-col items-start gap-2 md:w-full lg:w-2/3'>
        <div className='mb-4'>
          <h2 className='font-semibold text-gray-800 text-[16px] mb-2'>
            Scenario
          </h2>
          <p className='text-gray-700 text-[16px] md:text-[18px]'>{scenario}</p>
        </div>

        <div>
          <h2 className='font-semibold text-gray-800 text-[16px] mb-2'>
            Mitigation Strategy
          </h2>
          <p className='text-gray-700 text-[16px] md:text-[18px]'>{strategy}</p>
        </div>
      </div>
    </AccordionContent>
  );
}
