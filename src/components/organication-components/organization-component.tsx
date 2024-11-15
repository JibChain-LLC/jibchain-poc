'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import ProfileImage from '#/images/shell.svg';
import { formOrganizationFields } from '#/utils/utils';

export default function OrganizationComponent() {
  return (
    <div className='bg-gray-100 max-h-screen overflow-y-auto w-full p-6'>
      <div className='xl:p-32 p-4 bg-white text-black min-h-[95vh] shadow-md rounded-md'>
        <h1 className='text-2xl font-bold mb-4'>Shell USA, Inc.</h1>
        <div className='flex lg:flex-row flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Company Logo</p>
            <Image
              src={ProfileImage}
              alt='Company Logo'
              className='w-[80px] h-[80px]'
            />
          </div>
          <div className='relative gap-2 w-full'>
            <Input type='file' id='avatar-input' className='hidden' />
            <label
              htmlFor='avatar-input'
              className='border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:border-gray-500 h-[140px] text-black flex flex-col items-center justify-center'>
              <span className='text-center'>
                Click to upload or drag and drop
              </span>
              <span className='text-sm text-gray-500'>
                PNG or JPG (File size limit: 50MB)
              </span>
            </label>
          </div>
        </div>

        <form className='mt-8'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {formOrganizationFields.map((field) => (
              <div
                key={field.id}
                className={field.id === 'address' ? 'col-span-2' : ''}>
                <label htmlFor={field.id}>{field.label}</label>
                <Input
                  id={field.id}
                  type='text'
                  defaultValue={field.defaultValue || ''}
                />
              </div>
            ))}
          </div>
          <div className='mt-8'>
            <p className='text-lg font-semibold'>Owner</p>
            <div className='flex items-center gap-4'>
              <Image
                src={ProfileImage}
                alt='Owner Profile'
                className='w-[40px] h-[40px] rounded-full'
              />
              <div>
                <p className='font-bold'>Jamie Smith</p>
                <p className='text-gray-500'>jsmith@shell.com</p>
              </div>
            </div>
          </div>
          <div className='flex gap-4 mt-4'>
            <Button className='bg-green-700 text-white hover:bg-green-600'>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
