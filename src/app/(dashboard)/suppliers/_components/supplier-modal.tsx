'use client';

import Image from 'next/image';
import { Button } from '#/components/ui/button';
import { Card } from '#/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '#/components/ui/sheet';
import Shell from '#/images/shell.svg';
import ThumbsUp from '#/images/thumbs-up.svg';
import Star from '#/images/yellow-star-icon.svg';
interface SupplierModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, setOpen }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className='z-50 w-full max-w-lg bg-white p-6 text-black sm:max-w-xl lg:max-w-[50%]'>
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
            <h1 className='text-lg font-bold lg:text-2xl'>
              Blue Sky Industrial Inc.
            </h1>
            <h2 className='text-sm font-normal lg:text-lg'>
              Transportation, Communication, Import and Export
            </h2>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className='text-black'>
          <Card className='mt-6 w-full border-none bg-white'>
            <div className='flex flex-row justify-between gap-8 lg:mr-36'>
              {/* Left Side */}
              <div className='flex flex-col gap-6'>
                <div>
                  <h2 className='text-sm text-gray-600 lg:text-base'>
                    Risk Status
                  </h2>
                  <div className='flex items-center gap-3 rounded-lg bg-[#F3FAF7] p-4'>
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
                  <h2 className='text-sm text-gray-600 lg:text-base'>
                    Impact Operation
                  </h2>
                  <div className='flex items-center gap-2 rounded-lg p-4 text-black'>
                    <Image src={Star} alt='Impact' width={17} height={16} />
                    <h1 className='text-[18px] font-semibold'>Medium</h1>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className='flex flex-col text-black'>
                <h2 className='text-sm lg:text-base'>Risk Exposure (3)</h2>
                <div className='flex flex-col items-start gap-4 rounded-lg p-4 text-base lg:gap-6 lg:p-6 lg:text-lg'>
                  <h2>Ransomware Attack</h2>
                  <h2>Labor Strike</h2>
                  <h2>Political Instability</h2>
                </div>
              </div>
            </div>
          </Card>

          <div className='mt-4 flex flex-col gap-2 lg:mt-8'>
            <h2 className='text-sm text-gray-600'>Region (2)</h2>
            <div className='flex flex-col gap-2 border-l-2 border-green-500 pl-2 text-sm text-gray-900 lg:text-base'>
              <h1>South America</h1>
              <h1>North America</h1>
            </div>
          </div>

          <div className='mt-8 flex flex-row items-start gap-4 lg:mt-16'>
            <Button className='rounded-lg bg-green-700 p-3 px-4 text-white hover:bg-green-800 lg:px-6'>
              Download Report
            </Button>
            <Button className='rounded-lg border border-green-700 bg-white p-3 text-green-700 hover:bg-green-50'>
              Contact JibChain
            </Button>
          </div>
        </SheetDescription>

        <SheetFooter>
          <div className='mt-6 flex w-full flex-col gap-4 border-t border-gray-300 pt-4'>
            <div className='flex flex-col justify-between gap-10 lg:flex-row lg:gap-4'>
              <div className='text-sm lg:text-base'>
                <h2>Contact</h2>
                <h1 className='text-lg font-bold'>Robert Brown</h1>
                <h3>rbrown@blueskyindinc.com</h3>
              </div>
              <div className='text-sm lg:text-base'>
                <h2>Address</h2>
                <h1>92 Miles Drive, Newark, NJ 07103, California</h1>
                <h3>United States of America</h3>
              </div>
            </div>
            <Button className='max-w-36 rounded-lg border border-green-700 bg-white p-3 text-green-700 hover:bg-green-50'>
              Contact Supplier
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SupplierModal;
