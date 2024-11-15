'use client';
import React, { useState } from 'react';

interface DashboardIconProps {
  isActive?: boolean;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const fillColor = isActive || isHovered ? '#31C48D' : '#FFFFFF';

  return (
    <div
      className='flex items-center justify-center scale-125 rounded-md cursor-pointer transition-all duration-300 ml-2'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <svg
        width='16'
        height='17'
        viewBox='0 0 16 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_1055_3565)'>
          <path
            d='M5.46044 0.5H1.65067C0.739029 0.5 0 1.23903 0 2.15067V5.96044C0 6.87208 0.739029 7.61111 1.65067 7.61111H5.46044C6.37208 7.61111 7.11111 6.87208 7.11111 5.96044V2.15067C7.11111 1.23903 6.37208 0.5 5.46044 0.5Z'
            fill={fillColor}
          />
          <path
            d='M14.3493 0.5H10.5396C9.62792 0.5 8.88889 1.23903 8.88889 2.15067V5.96044C8.88889 6.87208 9.62792 7.61111 10.5396 7.61111H14.3493C15.261 7.61111 16 6.87208 16 5.96044V2.15067C16 1.23903 15.261 0.5 14.3493 0.5Z'
            fill={fillColor}
          />
          <path
            d='M5.46044 9.38889H1.65067C0.739029 9.38889 0 10.1279 0 11.0396V14.8493C0 15.761 0.739029 16.5 1.65067 16.5H5.46044C6.37208 16.5 7.11111 15.761 7.11111 14.8493V11.0396C7.11111 10.1279 6.37208 9.38889 5.46044 9.38889Z'
            fill={fillColor}
          />
          <path
            d='M14.3493 9.38889H10.5396C9.62792 9.38889 8.88889 10.1279 8.88889 11.0396V14.8493C8.88889 15.761 9.62792 16.5 10.5396 16.5H14.3493C15.261 16.5 16 15.761 16 14.8493V11.0396C16 10.1279 15.261 9.38889 14.3493 9.38889Z'
            fill={fillColor}
          />
        </g>
        <defs>
          <clipPath id='clip0_1055_3565'>
            <rect
              width='16'
              height='16'
              fill='white'
              transform='translate(0 0.5)'
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default DashboardIcon;
