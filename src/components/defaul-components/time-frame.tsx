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
    <div className='w-full'>
      <Select>
        <SelectTrigger
          className={`text-gray-800 border-none flex flex-row items-center justify-center gap-2  ${
            status ? 'bg-red-50' : 'bg-transparent'
          }`}
        >
          <SelectValue placeholder="This week" />
        </SelectTrigger>
        <SelectContent className="bg-white text-gray-700">
          <SelectGroup className="flex flex-col items-start cursor-pointer">
            <SelectItem className=" cursor-pointer" value="this-week">
              This week
            </SelectItem>
            <SelectItem className="  cursor-pointer" value="last-week">
              Last week
            </SelectItem>
            <SelectItem className="   cursor-pointer" value="this-month">
              This month
            </SelectItem>
            <SelectItem className="  cursor-pointer" value="last-month">
              Last month
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeFrame;
