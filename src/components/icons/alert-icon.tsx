'use client';
import React, { useState } from 'react';

interface AlertComponentProps {
  isActive?: boolean;
}

const AlertIcon: React.FC<AlertComponentProps> = ({ isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const fillColor = isActive || isHovered ? '#31C48D' : '#FFFFFF';

  return (
    <div
      className='ml-2 flex scale-125 cursor-pointer items-center justify-center rounded-md transition-all duration-300'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <svg
        width='16'
        height='17'
        viewBox='0 0 13 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.0002 14.8333C6.73353 14.8333 7.32686 14.24 7.32686 13.5067H4.67353C4.67353 14.24 5.26686 14.8333 6.0002 14.8333ZM11.5269 11.6933L10.6669 10.8333V6.83333C10.6669 4.6 9.09353 2.73333 7.0002 2.28V1.5C7.0002 0.946667 6.55353 0.5 6.0002 0.5C5.44686 0.5 5.0002 0.946667 5.0002 1.5V2.28C2.90686 2.73333 1.33353 4.6 1.33353 6.83333V10.8333L0.47353 11.6933C0.0535304 12.1133 0.346864 12.8333 0.940197 12.8333H11.0535C11.6535 12.8333 11.9469 12.1133 11.5269 11.6933ZM6.66686 10.1667H5.33353V8.83333H6.66686V10.1667ZM6.66686 6.83333C6.66686 7.2 6.36686 7.5 6.0002 7.5C5.63353 7.5 5.33353 7.2 5.33353 6.83333V5.5C5.33353 5.13333 5.63353 4.83333 6.0002 4.83333C6.36686 4.83333 6.66686 5.13333 6.66686 5.5V6.83333Z'
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default AlertIcon;
