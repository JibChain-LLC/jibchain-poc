// import { Eye, ShieldCheck, ShieldHalf, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import { FaStar, FaEye, FaShieldAlt } from 'react-icons/fa';
import Eye from '../../images/eye-icon.svg';
import Shield from '../../images/shield-icon.svg';
import Star from '../../images/star-icon.svg';
// Define the types for the props
interface VerticalScenarioBarProps {
  activeAccordion: string;
  contentHeights: { [key: string]: number };
}

const icons = [
  { id: 'item-1', icon: Star, label: 'Star' },
  {
    id: 'item-2',
    icon: Shield,
    label: 'Eye'
  },
  { id: 'item-3', icon: Eye, label: 'Shield' }
];

const VerticalScenarioBar: React.FC<VerticalScenarioBarProps> = ({
  activeAccordion,
  contentHeights
}) => {
  const [iconPositions, setIconPositions] = useState<number[]>([]);

  useEffect(() => {
    const topOffset = 10;
    const positions = icons.map((icon, index) => {
      const previousHeights = icons
        .slice(0, index)
        .reduce((sum, icon) => sum + (contentHeights[icon.id] || 0) + 120, 0);
      return topOffset + previousHeights;
    });
    setIconPositions(positions);
  }, [contentHeights]);

  return (
    <div className='mt-4 flex flex-col items-center'>
      {/* <Image src={icons[0].icon} alt='wewdw' className='p-2 z-50' /> */}
      {/* <div
        style={{
          height: `${iconPositions[iconPositions.length - 1] + 10}px `
        }}
        className=' left-1/2 w-[1px] bg-gray-300 transform -translate-x-1/2 '
      /> */}
      {/* {icons.map((item, index) => (
        <div
          key={item.id}
          style={{ top: `${iconPositions[index]}px` }}
          className={`absolute flex flex-col items-center justify-center rounded-full  ${
            activeAccordion === item.id
              ? 'bg-green-100 text-3xl '
              : 'bg-gray-100 text-xl'
          }`}>
          <Image
            src={item.icon}
            alt='wewdw'
            className='p-2 z-50 relative'
            height={10}
            width={23}
          />
        </div>
      ))} */}
    </div>
  );
};

export default VerticalScenarioBar;
