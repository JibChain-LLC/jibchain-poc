'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import ProfileImage from '#/images/shell.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { useState } from 'react';
import { roles, formUserFields } from '#/utils/utils';

export default function AccountComponent() {
  const [userRole, setUserRole] = useState<string>();
  const handleRoleChange = (newRole: string) => {
    setUserRole(newRole);
  };

  return (
    <div className='bg-gray-100 max-h-screen overflow-y-auto w-full p-6'>
      <div className='xl:p-32 p-4 bg-white text-black min-h-[95vh] shadow-md rounded-md'>
        <h1 className='text-2xl font-bold mb-4'>Jamie Smith</h1>
        <div className='flex lg:flex-row flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Upload Avatar</p>
            <Image
              src={ProfileImage}
              alt='image'
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
            {formUserFields.map((field) =>
              field.isSelect ? (
                <div key={field.id}>
                  <label htmlFor='role'>{field.label}</label>
                  <Select value={userRole} onValueChange={handleRoleChange}>
                    <SelectTrigger className='bg-white border-gray-300 w-full'>
                      <SelectValue>{userRole}</SelectValue>
                    </SelectTrigger>
                    <SelectContent className='bg-white text-black max-w-[200px]'>
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

          <div className='flex gap-4 mt-4'>
            <Button className='bg-green-700 text-white hover:bg-green-600'>
              Save Changes
            </Button>
            <Button className='bg-transparent text-red-700 border border-gray-400 hover:border-red-700'>
              Deactivate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
