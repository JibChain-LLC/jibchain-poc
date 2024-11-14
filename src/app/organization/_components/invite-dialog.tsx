'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '#/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { useToast } from '#/components/ui/use-toast';
import { RoleEnum } from '#/db/schema';
import inviteUser from '#/lib/actions/invite/create-invite';
import inviteFormSchema, { InviteSchema } from '#/lib/schema/invite-user';

export default function InviteDialog(props: { orgId: string }) {
  const { orgId } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<InviteSchema>({
    resolver: zodResolver(inviteFormSchema)
  });

  const onSubmit = async (data: InviteSchema) => {
    const { email, role } = data;

    setLoading(true);
    const res = await inviteUser({
      email,
      role,
      orgId
    });
    setLoading(false);

    if (!res.ok) {
      toast({
        variant: 'destructive',
        title: 'Failed to invite user',
        description: res.message
      });
      return;
    }

    toast({
      title: 'Invite created',
      description: `Invite sent to ${res.data?.email}`
    });

    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ['invites'] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>
          <UserPlus />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user to organization</DialogTitle>
          <DialogDescription>
            Enter user&apos;s email and select their role.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='flex flex-col gap-3'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                size={'sm'}
                className='w-full'
                disabled={loading}>
                {loading ? (
                  <>
                    Creating invite
                    <LoaderCircle className='animate-spin' />
                  </>
                ) : (
                  'Invite User'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
