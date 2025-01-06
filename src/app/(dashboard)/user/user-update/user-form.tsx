'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { toast } from '#/components/ui/use-toast';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { updateUserInput } from '#/trpc/schemas';

type UpdateUserFormSchema = RouterInputs['user']['updateUser'];

type User = {
  email: string;
  user_metadata: {
    firstName: string;
    lastName: string;
    jobRole: string;
  };
};

export default function UserFormUpdate({ user }: { user: User }) {
  const [userData, setUserData] = useState<User>(user);

  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserInput),
    defaultValues: {
      firstName: user?.user_metadata?.firstName || '',
      lastName: user?.user_metadata?.lastName || '',
      jobRole: user?.user_metadata?.jobRole || '',
      email: user?.email || '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate: update, isPending } = trpc.user.updateUser.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message || 'Something went wrong.'
      });
    },
    onSuccess: (data, variables) => {
      toast({
        title: 'Update Successful',
        description: 'Your information has been updated successfully.'
      });
      form.reset({
        ...variables,
        password: '',
        confirmPassword: ''
      });

      setUserData((prev) => ({
        ...prev,
        user_metadata: {
          ...prev.user_metadata,
          firstName: variables.firstName || '',
          lastName: variables.lastName || '',
          jobRole: prev.user_metadata.jobRole
        },
        email: variables.email || prev.email
      }));
    }
  });

  const handleSubmit = form.handleSubmit((data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== '')
    );
    update(filteredData);
  });

  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'First Name'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Last Name'
    },
    {
      name: 'jobRole',
      label: 'Job Title',
      type: 'text',
      placeholder: 'Job Role'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'name@example.com'
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••••'
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '••••••••••'
    }
  ];

  return (
    <div className='h-screen overflow-y-auto bg-white text-black shadow-md'>
      <div className='rounded-md p-4 px-6 py-12 lg:px-12 xl:px-32'>
        <h1 className='mb-4 text-[30px] font-bold'>
          {userData?.user_metadata?.firstName || ''}{' '}
          {userData?.user_metadata?.lastName || ''}
        </h1>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Upload Avatar</p>
            <Avatar className='size-20'>
              <AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
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

        <div className='py-8'>
          <Form {...form}>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                {formFields.map(({ name, label, type, placeholder }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof UpdateUserFormSchema}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            type={type}
                            placeholder={placeholder}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormRootError />
              <Button
                type='submit'
                disabled={isPending}
                className='max-w-[200px]'>
                {isPending ? 'Updating...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
