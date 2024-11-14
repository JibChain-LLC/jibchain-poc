import { useQueryClient } from '@tanstack/react-query';
import { Copy, MoreVertical } from 'lucide-react';
import { useCopyToClipboard } from 'react-use';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';
import { toast } from '#/components/ui/use-toast';
import deleteInvitation from '#/lib/actions/invite/delete-invite';

export default function InviteActions(props: { id: string }) {
  const { id } = props;
  const [_, copyToClipboard] = useCopyToClipboard();
  const queryClient = useQueryClient();

  const copyInviteLink = () => {
    const url = new URL('/organization/join', window.location.origin);
    url.searchParams.set('inviteId', id);
    copyToClipboard(url.toString());
  };

  const handleDeleteInvite = async () => {
    const res = await deleteInvitation({ inviteId: id });
    if (!res.ok) {
      toast({
        variant: 'destructive',
        title: 'Invitation failed to cancel',
        description: res.message
      });
      return;
    }

    toast({
      title: 'Invitation successfully canceled',
      description: `Invite to ${res.data!.email} has been removed.`
    });
    queryClient.invalidateQueries({ queryKey: ['invites'] });
  };

  return (
    <div className='flex flex-row justify-end gap-1'>
      <Button
        variant='ghost'
        className='size-8 p-0'
        title='Copy invite link'
        onClick={copyInviteLink}>
        <Copy />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleDeleteInvite}
            className='flex flex-col items-start gap-1'>
            <p>Cancel invitation</p>
            <p className='text-xs text-foreground/75'>
              Revoke this invitation.
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex flex-col items-start gap-1'
            disabled>
            <p>Resend invitation</p>
            <p className='text-xs text-foreground/75'>
              Invites expire after 24 hours.
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
