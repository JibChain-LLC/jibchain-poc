import React from 'react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import Image from 'next/image';
import TopRiskCards from './top-risk-cards';
import OfficeImage from '../../../../images/office-image.jpg';
import LearningImage from '../../../../images/learning-image.jpg';
import CalendarImage from '../../../../images/calendar-image.jpg';
import Jumbotron from '../../../../images/jumbotron.jpg';

const cardData = [
  {
    image: OfficeImage,
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat',
    buttonText: 'Read More',
  },
  {
    image: CalendarImage,
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat',
    buttonText: 'Read More',
  },
  {
    image: LearningImage,
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat',
    buttonText: 'Read More',
  },
];

const TechnologicalFailure = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7  pt-4 bg-gray-50 ">
      <div className="lg:col-span-5 flex flex-col space-y-6 ">
        <Card className="border-none shadow-none ">
          <h1 className="text-2xl lg:text-3xl font-semibold">Welcome to Coeus!</h1>
          <h3 className="mt-3 text-lg lg:text-xl font-medium text-gray-700">
            Featured News
          </h3>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="bg-white shadow-sm rounded-xl overflow-hidden"
            >
              <Image
                src={card.image}
                alt="Feature"
                className="w-full h-32 lg:h-48 object-cover"
              />
              <div className="p-4 flex flex-col">
                <p className="text-gray-700 text-xs lg:text-sm mb-4">
                  {card.description}
                </p>
                <Button className="w-28 bg-white text-green-800 border border-green-800 hover:bg-green-600 hover:text-white font-semibold transition duration-300">
                  {card.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="relative w-full min-h-[300px] lg:min-h-[420px] rounded-xl overflow-hidden">
           <Image
            src={Jumbotron}
             alt="Operational Resilience"
             className="absolute inset-0 w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black opacity-70"></div>
           <div className="relative flex flex-col items-center justify-center text-white px-4 py-6 lg:py-12 lg:mt-20 mt-12">
             <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center">
               Operational Resilience with AI
             </h1>
             <p className="text-sm sm:text-base md:text-lg mt-2 sm:mt-4 max-w-lg text-center">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, natus optio consequuntur velit perferendis.
              </p>
             <Button className="bg-green-600 hover:bg-green-700 mt-4 lg:mt-6 px-4 py-2 lg:px-6 lg:py-3">
                 Learn More
             </Button>
           </div>
         </Card>
      </div>
      <div className="lg:col-span-2 bg-white h-full lg:p-4 lg:pl-10 p-0 ">
        <TopRiskCards />
      </div>
    </div>
  );
};

export default TechnologicalFailure;
