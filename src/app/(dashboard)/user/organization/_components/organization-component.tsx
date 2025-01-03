'use client';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { formOrganizationFields } from '#/utils/utils';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';

export default function OrganizationComponent() {
  return (
    <div className='max-h-screen w-full overflow-y-auto bg-transparent'>
      <div className='min-h-[95vh] rounded-lg bg-white text-black shadow-md'>
        <h1 className='mb-4 text-[30px] font-bold'>Shell USA, Inc.</h1>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Company Logo</p>
            <Avatar className='size-20'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='relative w-full gap-2'>
            <Input type='file' id='avatar-input' className='hidden' />
            <label
              htmlFor='avatar-input'
              className='flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-black hover:border-gray-500'>
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
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
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
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className='font-bold'>Jamie Smith</p>
                <p className='text-gray-500'>jsmith@shell.com</p>
              </div>
            </div>
          </div>
          <div className='mt-4 flex gap-4'>
            <Button className='bg-green-700 text-white hover:bg-green-600'>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
