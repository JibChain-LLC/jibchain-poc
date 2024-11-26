import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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
            <SelectItem className="cursor-pointer" value="this-week">
              This week
            </SelectItem>
            <SelectItem className="cursor-pointer" value="last-week">
              Last week
            </SelectItem>
            <SelectItem className="cursor-pointer" value="this-month">
              This month
            </SelectItem>
            <SelectItem className="cursor-pointer" value="last-month">
              Last month
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeFrame;
