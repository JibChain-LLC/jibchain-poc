'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { RouterInputs, trpc } from '#/trpc/query-clients/client';
import { updateUserInput } from '#/trpc/schemas';

type UpdateUserSchema = RouterInputs['user']['update'];

export default function UpdateUserForm() {
  const { data } = trpc.user.read.useQuery();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserInput)
  });

  useEffect(() => {
    if (data === undefined) return;
    form.reset({
      firstName: data.firstName ?? undefined,
      lastName: data.lastName ?? undefined,
      jobRole: data.jobRole ?? undefined,
      email: data.email
    });
  }, [data]);

  return (
    <div className='w-full'>
      <h1 className='mb-4 text-[30px] font-bold'>
        {data?.firstName} {data?.lastName}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((d) => console.log(d))}
          className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Acme Co. LLC' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Acme Co. LLC' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <FormField
              control={form.control}
              name='jobRole'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Acme Co. LLC' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='test@mail.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
