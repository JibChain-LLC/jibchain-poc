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
import { StarIcon, ThumbsUp } from 'lucide-react';
import { riskExposures } from '#/utils/utils';
import { regions } from '#/utils/utils';
interface SupplierModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, setOpen }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className='z-50 w-full max-w-lg rounded-lg bg-white p-6 text-black shadow-lg sm:max-w-xl lg:max-w-[50%]'>
        <SheetHeader className='flex flex-col items-start'>
          <SheetTitle className='flex flex-col items-start gap-4 text-black'>
            <Image
              src={Shell}
              alt='Shell logo'
              width={84}
              height={84}
              className='mb-4'
            />
            <h2 className='text-sm font-medium text-gray-600'>
              Supplier since March 2022
            </h2>
            <h1 className='text-lg font-bold text-gray-800 lg:text-2xl'>
              Blue Sky Industrial Inc.
            </h1>
            <h2 className='text-sm font-normal text-gray-700 lg:text-lg'>
              Transportation, Communication, Import and Export
            </h2>
          </SheetTitle>
        </SheetHeader>

        <SheetDescription className='text-black'>
          <Card className='mt-6 w-full rounded-lg border-none shadow-none'>
            <div className='flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-12'>
              <div className='flex flex-col gap-6 p-3'>
                <div>
                  <p className='text-lg text-gray-600'>
                    Risk Status
                  </p>
                  <div className='flex items-center gap-3 rounded-lg bg-[#F3FAF7] p-4'>
                    <ThumbsUp color='#046C4E' fill='#046C4E'/>{' '}
                    <p className='text-lg font-semibold text-green-800'>
                      Low
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-lg text-gray-600'>
                    Impact Operation
                  </p>
                  <div className='flex items-center gap-2 rounded-lg bg-gray-100 p-4'>
                    <StarIcon color='#E3A008' fill='#E3A008' />
                    <p className='text-lg font-semibold text-gray-800'>
                      Medium
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col p-3'>
                <h2 className='text-sm text-gray-600 lg:text-base'>
                  Risk Exposure ({riskExposures.length})
                </h2>
                <div className='flex flex-col gap-4 rounded-lg p-4 text-sm text-gray-800 lg:gap-6 lg:p-6 lg:text-base'>
                  {riskExposures.map((exposure, index) => (
                    <h2
                      key={index}
                      className='w-full border-b-2 border-gray-200 px-2 py-2 hover:bg-gray-100 md:min-w-[300px]'>
                      {exposure}
                    </h2>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className='mt-6'>
            <h2 className='text-sm text-gray-600'>Region ({regions.length})</h2>
            <div className='flex flex-col gap-2 border-l-2 border-green-500 pl-4 text-sm text-gray-900 lg:text-base'>
              {regions.map((region, index) => (
                <h1 key={index}>{region}</h1>
              ))}
            </div>
          </div>

          <div className='mt-8 flex flex-col items-start gap-4 lg:flex-row'>
            <Button variant='default' className='p-3 px-4'>
              Download Report
            </Button>
            <Button variant='outline' className='rounded-lg p-3 text-green-700'>
              Contact JibChain
            </Button>
          </div>
        </SheetDescription>

        <SheetFooter>
          <div className='mt-6 flex w-full flex-col gap-4 border-t border-gray-300 pt-4'>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              <div className='text-sm text-gray-700 lg:text-base'>
                <h2 className='text-gray-600'>Contact</h2>
                <h1 className='text-lg font-bold text-gray-800'>
                  Robert Brown
                </h1>
                <h3>rbrown@blueskyindinc.com</h3>
              </div>
              <div className='text-sm text-gray-700 lg:text-base'>
                <h2 className='text-gray-600'>Address</h2>
                <h1>92 Miles Drive, Newark, NJ 07103, California</h1>
                <h3>United States of America</h3>
              </div>
            </div>
            <Button
              variant='outline'
              className='max-w-[150px] self-center lg:self-start'>
              Contact Supplier
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SupplierModal;
