'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserAdd } from 'flowbite-react-icons/solid';
import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogHeader
} from '#/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { RoleEnum } from '#/enums';
import type { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { createInviteInput } from '#/trpc/schemas';

const inviteSchema = createInviteInput.omit({ orgId: true });
type InviteSchema = Omit<RouterInputs['org']['invite']['create'], 'orgId'>;

export default function InviteDialog(props: { orgId: string }) {
  const { orgId } = props;

  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<InviteSchema>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: RoleEnum.USER
    }
  });

  const utils = trpc.useUtils();
  const { mutate, isPending } = trpc.org.invite.create.useMutation({
    onSuccess(d) {
      toast({
        title: 'Invite created',
        description: `Invite sent to ${d.email}`
      });

      form.reset();
      setOpen(false);
      utils.org.invite.list.invalidate();
    },
    onError(err) {
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
        <Button>
          <UserAdd />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a new team member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => mutate({ ...d, orgId }))}>
            <div className='flex flex-row gap-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder="Enter user's email address"
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
