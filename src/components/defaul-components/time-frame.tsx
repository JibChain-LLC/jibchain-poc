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
    <div className='w-full'>
      <Select>
        <SelectTrigger
          className={cn(status ? 'w-full bg-red-50 px-4' : 'w-[140px]')}>
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
    </div>
  );
};

export default TimeFrame;
