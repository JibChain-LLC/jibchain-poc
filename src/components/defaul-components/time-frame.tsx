import React from 'react';
import { cn } from '#/lib/utils';
import { timeFrames } from '#/utils/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

type TimeFrameProp = {
  status: boolean;
};

const TimeFrame: React.FC<TimeFrameProp> = ({ status }) => {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          'size-fit gap-2 border-none p-0.5 text-xs font-medium text-gray-600',
          status && 'bg-red-50'
        )}>
        <SelectValue placeholder='This week' />
      </SelectTrigger>
      <SelectContent className='bg-white text-gray-700'>
        <SelectGroup>
          {timeFrames.map((timeFrame) => (
            <SelectItem
              key={timeFrame.value}
              className='cursor-pointer'
              value={timeFrame.value}>
              {timeFrame.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TimeFrame;
