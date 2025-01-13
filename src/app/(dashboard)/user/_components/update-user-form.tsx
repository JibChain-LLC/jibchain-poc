'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { useToast } from '#/components/ui/use-toast';
import revalidateAllPath from '#/revalidate-path';
import { RouterInputs, trpc } from '#/trpc/query-clients/client';
import { updateUserInput } from '#/trpc/schemas';

type UpdateUserSchema = RouterInputs['user']['update'];

export default function UpdateUserForm() {
  const { data } = trpc.user.read.useQuery();

  const { toast } = useToast();
  const utils = trpc.useUtils();

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

  const { mutate, isPending } = trpc.user.update.useMutation({
    onSuccess: async (_, d) => {
      await utils.org.read.invalidate();
      await revalidateAllPath();
      form.reset(d);
      toast({
        title: 'Success',
        description: 'Updates to account saved'
      });
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message
      });
    }
  });

  return (
    <div className='w-full'>
      <h1 className='mb-4 text-[30px] font-bold'>
        {data?.firstName} {data?.lastName}
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((d) => mutate(d))}
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
          </div>
          <Button
            type='submit'
            disabled={isPending || !form.formState.isDirty}
            className='w-fit'>
            Save Changes {isPending && <Loader2 className='animate-spin' />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
