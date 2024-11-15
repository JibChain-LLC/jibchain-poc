'use client';
import { Button } from '../ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '../ui/sheet';
import Shell from '../../images/shell.svg';
import Image from 'next/image';
import { Card } from '../ui/card';
import ThumbsUp from '../../images/thumbs-up.svg';
import Star from '../../images/yellow-star-icon.svg';

const SupplierModal = ({ isOpen, setOpen }: any) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className='w-full max-w-lg p-6 sm:max-w-xl lg:max-w-[50%] bg-white text-black z-50'>
        <SheetHeader className='flex flex-col items-start'>
          <SheetTitle className='flex flex-col items-start gap-2 text-black'>
            <Image
              src={Shell}
              alt='Shell logo'
              width={84}
              height={84}
              className='mb-4'
            />
            <h2 className='text-sm font-medium'>Supplier since March 2022</h2>
            <h1 className='font-bold text-lg lg:text-2xl'>
              Blue Sky Industrial Inc.
            </h1>
            <h2 className='text-sm font-normal lg:text-lg'>
              Transportation, Communication, Import and Export
            </h2>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className='text-black'>
          <Card className='border-none bg-white w-full mt-6'>
            <div className='flex flex-row justify-between gap-8 lg:mr-36'>
              {/* Left Side */}
              <div className='flex flex-col gap-6'>
                <div>
                  <h2 className='text-gray-600 lg:text-base text-sm'>
                    Risk Status
                  </h2>
                  <div className='flex items-center gap-3 bg-[#F3FAF7] p-4 rounded-lg'>
                    <Image
                      src={ThumbsUp}
                      alt='Low risk'
                      width={17}
                      height={16}
                    />
                    <h1 className='text-[18px] font-semibold text-green-800'>
                      Low
                    </h1>
                  </div>
                </div>
                <div>
                  <h2 className='text-gray-600 lg:text-base text-sm'>
                    Impact Operation
                  </h2>
                  <div className='flex items-center gap-2 p-4 rounded-lg text-black'>
                    <Image src={Star} alt='Impact' width={17} height={16} />
                    <h1 className='text-[18px] font-semibold'>Medium</h1>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className='flex flex-col text-black'>
                <h2 className='lg:text-base text-sm'>Risk Exposure (3)</h2>
                <div className='flex flex-col items-start gap-4 p-4 lg:gap-6 lg:p-6 rounded-lg lg:text-lg text-base'>
                  <h2>Ransomware Attack</h2>
                  <h2>Labor Strike</h2>
                  <h2>Political Instability</h2>
                </div>
              </div>
            </div>
          </Card>

          <div className='flex flex-col lg:mt-8 mt-4 gap-2'>
            <h2 className='text-gray-600 text-sm'>Region (2)</h2>
            <div className='border-l-2 pl-2 border-green-500 text-gray-900 text-sm lg:text-base flex flex-col gap-2'>
              <h1>South America</h1>
              <h1>North America</h1>
            </div>
          </div>

          <div className='flex flex-row items-start gap-4 lg:mt-16 mt-8'>
            <Button className='bg-green-700 text-white p-3 lg:px-6 px-4 rounded-lg hover:bg-green-800'>
              Download Report
            </Button>
            <Button className='border border-green-700 bg-white text-green-700 rounded-lg p-3 hover:bg-green-50'>
              Contact JibChain
            </Button>
          </div>
        </SheetDescription>

        <SheetFooter>
          <div className='border-t mt-6 w-full border-gray-300 flex flex-col gap-4 pt-4'>
            <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-4'>
              <div className='text-sm lg:text-base'>
                <h2>Contact</h2>
                <h1 className='font-bold text-lg'>Robert Brown</h1>
                <h3>rbrown@blueskyindinc.com</h3>
              </div>
              <div className='text-sm lg:text-base'>
                <h2>Address</h2>
                <h1>92 Miles Drive, Newark, NJ 07103, California</h1>
                <h3>United States of America</h3>
              </div>
            </div>
            <Button className='border max-w-36 bg-white border-green-700 text-green-700 rounded-lg p-3 hover:bg-green-50'>
              Contact Supplier
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SupplierModal;
