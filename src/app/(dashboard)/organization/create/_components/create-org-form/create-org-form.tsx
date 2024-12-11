'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormRootError
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { useGoTo } from '#/hooks';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { createOrgInput } from '#/trpc/schemas';

type CreateOrgSchema = RouterInputs['org']['create'];

export default function CreateOrgForm() {
  const goTo = useGoTo();
  const form = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgInput),
    defaultValues: {
      name: ''
    }
  });

  const { mutate, isPending, isSuccess } = trpc.org.create.useMutation({
    onError: (err) => {
      form.setError('root', { message: err.message });
    },
    onSuccess: goTo('/organization')
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => mutate(d))}
        className='flex flex-col gap-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormRootError />
        <Button type='submit' disabled={isPending || isSuccess}>
          {(isPending || isSuccess) && (
            <LoaderCircle className='animate-spin' />
          )}
          {isSuccess ? 'Redirecting' : 'Create Organization'}
        </Button>
      </form>
    </Form>
  );
}
