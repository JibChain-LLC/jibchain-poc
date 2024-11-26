import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { timeFrames } from '#/utils/utils';
type TimeFrameProp = {
  status: boolean;
};

const TimeFrame: React.FC<TimeFrameProp> = ({ status }) => {
  return (
    <div className="w-full">
      <Select>
        <SelectTrigger
          className={`${
            status ? 'bg-red-50 w-full px-4' : 'w-[140px]'
          }`}
        >
          <SelectValue placeholder="This week" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-700">
          <SelectGroup>
            {timeFrames.map((timeFrame:any) => (
              <SelectItem
                key={timeFrame.value}
                className="cursor-pointer"
                value={timeFrame.value}
              >
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
