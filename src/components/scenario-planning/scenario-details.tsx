import { Card } from '#/components/ui/card';
import { AccordionContent } from '../ui/accordion';
import { Button } from '../ui/button';

interface ScenarioDetailsProps {
  scenario: string;
  strategy: string;
  confidenceLevel: string | number;
  implementationTime: string;
  cost: string | number;
}

const InfoCard = ({
  title,
  value
}: {
  title: string;
  value: string | number;
}) => (
  <div className='border-b p-6 shadow-none last:border-b-0 md:w-full'>
    <h2 className='text-[14px] font-semibold text-gray-500 md:text-[16px] lg:text-[14px]'>
      {title}
    </h2>
    <p className='mt-2 text-[18px] font-semibold text-black md:text-[20px] lg:text-[22px]'>
      {value}
    </p>
  </div>
);

const DetailSection = ({
  title,
  content
}: {
  title: string;
  content: string;
}) => (
  <div>
    <h2 className='mb-2 text-[16px] font-semibold text-gray-500'>{title}</h2>
    <p className='text-[16px] text-gray-700 md:text-[18px]'>{content}</p>
  </div>
);

export default function ScenarioDetails({
  scenario,
  strategy,
  confidenceLevel,
  implementationTime,
  cost
}: ScenarioDetailsProps) {
  return (
    <AccordionContent className='flex max-h-[370px] min-h-[370px] flex-col gap-8 overflow-y-auto p-4 text-sm text-gray-600 lg:flex-row lg:px-10'>
      <Card className='flex h-fit flex-col items-start rounded-md bg-white px-4 shadow-lg md:w-full md:items-center lg:w-[250px]'>
        <InfoCard title='Confidence Level' value={confidenceLevel} />
        <InfoCard title='Time to Implement' value={implementationTime} />
        <InfoCard title='Cost to Implement' value={cost} />
      </Card>

      <div className='flex flex-col items-start gap-8 md:w-full lg:w-2/3'>
        <DetailSection title='Scenario' content={scenario} />
        <DetailSection title='Mitigation Strategy' content={strategy} />
        <div className='flex flex-col gap-y-3'>
          <h2 className='text-[16px] font-semibold text-gray-800'>
            In need of further planning?
          </h2>
          <div className='flex gap-4'>
            <Button className='rounded-lg bg-green-700 p-3 px-4 text-white hover:bg-green-800 lg:px-6'>
              Contact JibChain
            </Button>
            <Button
              variant='outline'
              className='border-green-700 bg-transparent text-green-700'>
              Copy Email Address
            </Button>
          </div>
        </div>
      </div>
    </AccordionContent>
  );
}
