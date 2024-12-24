'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { Button } from '#/components/ui/button';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { updateUserInput } from '#/trpc/schemas';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { toast } from '#/components/ui/use-toast';

type UpdateUserFormSchema = RouterInputs['user']['updateUser'];

export default function AccountPage() {
  const form = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserInput),
    defaultValues: {
      firstName: '',
      lastName: '',
      jobRole: '',
      email: '',
      // password: '',
      // confirmPassword: '',
    },
  });

  const { data: userData, isLoading } = trpc.user.getUser.useQuery();

  const { mutate: update, isPending } = trpc.user.updateUser.useMutation({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message || 'Something went wrong.',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Update Successful',
        description: 'Your information has been updated successfully.',
      });
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset(userData); // Populate form with user data
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-screen overflow-y-auto bg-white text-black shadow-md'>
    <div className='rounded-md p-4 px-6 py-12 lg:px-12 xl:px-32'>
      <h1 className='mb-4 text-[30px] font-bold'>{userData?.firstName || ""} {userData?.lastName || ""} </h1>
      <div className='flex flex-col gap-2 lg:flex-row'>
        <div className='flex flex-col gap-2'>
          <p className='min-w-[120px]'>Upload Avatar</p>
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
    <div className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => update(data))} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Job Role" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="name@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormRootError />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </Form>

    </div>
    </div>
    </div>
  );
}
