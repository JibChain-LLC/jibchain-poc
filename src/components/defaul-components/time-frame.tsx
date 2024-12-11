'use client';

import React, { useState } from 'react';
import { cn } from '#/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

export const timeFrames = [
  { label: 'Live view', value: 'live' },
  { label: '48 hours', value: '48-hours' },
  { label: '4 days', value: '4-days' },
  { label: 'This month', value: 'this-month' }
] as const;

type TimeValue = (typeof timeFrames)[number]['value'];

type TimeFrameProps = {
  onValueChange?: (v: TimeValue) => void;
  startValue?: TimeValue;
  className?: string;
  mini?: boolean;
};

const TimeFrame: React.FC<TimeFrameProps> = (props) => {
  const {
    onValueChange,
    className,
    startValue = timeFrames[0].value,
    mini = false
  } = props;

  const [value, setValue] = useState<TimeValue>(startValue);

  const handleValueChange = (v: TimeValue) => {
    setValue(v);
    if (onValueChange) onValueChange(v);
  };

  return (
    <div>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger
          className={cn(
            'h-fit w-full justify-center gap-2 rounded-md border-transparent px-4 py-1.5 text-xs font-semibold leading-tight focus:border-transparent focus:ring-transparent',
            value === timeFrames[0].value && !mini && 'bg-red-50 text-red-800',
            mini && 'gap-1 bg-transparent p-0 text-gray-600',
            className
          )}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectGroup>
            {timeFrames.map((timeFrame) => (
              <SelectItem
                key={timeFrame.value}
                className={cn(
                  'cursor-pointer',
                  timeFrame.value === 'live' && 'text-red-800'
                )}
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
