'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Plus, UserPlus } from 'lucide-react';
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
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const form = useForm<InviteSchema>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: '',
      role: RoleEnum.USER
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: InviteSchema) => {
      const { email, role } = data;
      const res = await inviteUser({
        email,
        role,
        orgId
      });

      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onSuccess: (d) => {
      toast({
        title: 'Invite created',
        description: `Invite sent to ${d.data.email}`
      });

      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['invites'] });
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to invite user',
        description: err.message
      });
    }
  });

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
          <DialogTitle>Invite a new team member</DialogTitle>
          <DialogDescription>
            Enter user&apos;s email and select their role.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => mutate(d))}>
            <div className='flex flex-row gap-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex-1'>
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
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='w-36'>
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
                        {Object.values(RoleEnum)
                          .filter((r) => r !== RoleEnum.OWNER)
                          .map((r) => (
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
            </div>
            <DialogFooter className='mt-3'>
              <Button type='submit' disabled={isPending}>
                {isPending ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  <Plus />
                )}
                {!isPending ? 'Invite' : 'Creating invite'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
