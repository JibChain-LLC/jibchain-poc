'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RoleEnum } from '#/db/schema';
import inviteUser from '#/lib/actions/invite-user';
import inviteFormSchema, { InviteSchema } from '#/lib/schema/invite-user';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

interface InviteFormProps {
  orgId: string;
}

export default function InviteForm(props: InviteFormProps) {
  const { orgId } = props;

  const form = useForm<InviteSchema>({
    resolver: zodResolver(inviteFormSchema)
  });

  const onSubmit = async (data: InviteSchema) => {
    const { email, role } = data;
    console.log(email, role);
    // TODO: add error/success toasts
    const t = await inviteUser({
      email,
      role,
      orgId
    });
    console.log(t);
  };

  return (
    <Form {...form}>
      <form
        className='flex items-end gap-3'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='Email Address'
                  className='w-80'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-40'>
                    <SelectValue placeholder='Role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RoleEnum).map((r) => (
                    <SelectItem value={r} key={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Invite User</Button>
      </form>
    </Form>
  );
}
