'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import createOrganization from '#/lib/actions/organization/create-org';
import createOrgSchema, { CreateOrgSchema } from '#/lib/schema/create-org';

export default function CreateOrgForm() {
  const form = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof createOrgSchema>) => {
    const res = await createOrganization(data);
    console.log(res);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <Button type='submit'>Create</Button>
      </form>
    </Form>
  );
}
