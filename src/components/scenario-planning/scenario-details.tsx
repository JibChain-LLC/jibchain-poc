import { Card } from '#/components/ui/card';
import { AccordionContent } from '../ui/accordion';

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
  <div className='border-b p-6 shadow-none md:w-full'>
    <h2 className='text-[14px] font-semibold text-gray-700 md:text-[16px] lg:text-[14px]'>
      {title}
    </h2>
    <p className='mt-2 text-[18px] font-semibold text-black md:text-[20px] lg:text-[22px]'>
      {value}
    </p>
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
    <AccordionContent className='flex flex-col items-stretch gap-10 px-8 text-sm text-gray-600 lg:flex-row lg:px-16'>
      <Card className='flex h-fit flex-col items-start bg-white px-4 md:w-full md:items-center lg:w-[250px]'>
        <InfoCard title='Confidence Level' value={confidenceLevel} />
        <InfoCard title='Time to Implement' value={implementationTime} />
        <InfoCard title='Cost to Implement' value={cost} />
      </Card>

      <div className='flex flex-col items-start gap-4 md:w-full lg:w-2/3'>
        <DetailSection title='Scenario' content={scenario} />
        <DetailSection title='Mitigation Strategy' content={strategy} />
      </div>
    </AccordionContent>
  );
}

const DetailSection = ({
  title,
  content
}: {
  title: string;
  content: string;
}) => (
  <div>
    <h2 className='mb-2 text-[16px] font-semibold text-gray-800'>{title}</h2>
    <p className='text-[16px] text-gray-700 md:text-[18px]'>{content}</p>
  </div>
);
