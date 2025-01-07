import { ComponentProps } from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip';
import { RiskLevelEnum } from '#/enums';

interface RiskAlertHeaderProps {
  category: string;
  probability: number;
  level: RiskLevelEnum;
  date: string;
}

const BADGE_MAP: Record<
  RiskLevelEnum,
  { text: string; variant: ComponentProps<typeof Badge>['variant'] }
> = {
  low: { text: 'Low', variant: 'default' },
  med: { text: 'Medium', variant: 'warning' },
  hi: { text: 'High', variant: 'destructive' }
};

export default function RiskAlertHeader(props: RiskAlertHeaderProps) {
  const { category, probability, level, date } = props;

  return (
    <div className='mb-6 flex items-start justify-between'>
      <div className='flex flex-col gap-1.5'>
        <div className='flex flex-row items-center gap-1.5'>
          <span className='text-xs font-semibold text-gray-500'>{date}</span>
          <Badge variant={BADGE_MAP[level].variant}>
            {BADGE_MAP[level].text} Threat: {Math.ceil(probability * 100)}%
          </Badge>
        </div>
        <p className='text-2xl font-semibold leading-tight text-gray-950'>
          {category}
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <Button asChild>
          <a href='mailto:coeus@adssrisk.com'>Contact ADSS</a>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled>Download Report</Button>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>This feature is not available during the beta</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
