'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import ProfileImage from '#/images/shell.svg';
import { roles, formUserFields } from '#/utils/utils';

export default function AccountPage() {
  const [userRole, setUserRole] = useState<string>();
  const handleRoleChange = (newRole: string) => {
    setUserRole(newRole);
  };

  return (
    <div className=''>
      <div className='min-h-[96vh] rounded-md bg-white p-4 text-black shadow-md xl:p-32 '>
        <h1 className='mb-4 text-2xl font-bold'>Jamie Smith</h1>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Upload Avatar</p>
            <Image src={ProfileImage} alt='image' className='size-[80px]' />
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
            {formUserFields.map((field) =>
              field.isSelect ? (
                <div key={field.id}>
                  <label htmlFor='role'>{field.label}</label>
                  <Select value={userRole} onValueChange={handleRoleChange}>
                    <SelectTrigger className='w-full border-gray-300 bg-white'>
                      <SelectValue>{userRole}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className='max-w-[200px] bg-white text-black'>
                      {roles.map((role) => (
                        <SelectItem
                          key={role.value}
                          value={role.value}
                          className={role.className || ''}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <Input
                    id={field.id}
                    type={field.type || 'text'}
                    defaultValue={field.defaultValue || ''}
                  />
                </div>
              )
            )}
          </div>

          <div className='mt-4 flex gap-4'>
            <Button className='bg-green-700 text-white hover:bg-green-600'>
              Save Changes
            </Button>
            <Button className='border border-gray-400 bg-transparent text-red-700 hover:border-red-700'>
              Deactivate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}