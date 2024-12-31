'use client';

import { Copy } from 'lucide-react';
import { useCopyToClipboard } from 'react-use';
import { Button } from '#/components/ui/button';
import { DropdownMenuItem } from '#/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '#/components/ui/tooltip';
import { toast } from '#/components/ui/use-toast';
import { trpc } from '#/trpc/query-clients/client';
import ControlledDropdown from './controlled-dropdown';

export default function InviteActions(props: { id: string }) {
  const { id } = props;
  const [_, copyToClipboard] = useCopyToClipboard();

  const copyInviteLink = () => {
    const url = new URL('/join', window.location.origin);
    url.searchParams.set('inviteId', id);
    copyToClipboard(url.toString());
  };

  const utils = trpc.useUtils();
  const { mutate: deleteInvite } = trpc.org.invite.delete.useMutation({
    onSuccess(data) {
      toast({
        title: 'Invitation successfully canceled',
        description: `Invite to ${data.email} has been removed.`
      });
      utils.org.invite.list.invalidate();
    },
    onError(err) {
      toast({
        variant: 'destructive',
        title: 'Invitation failed to cancel',
        description: err.message
      });
    }
  });

  return (
    <div className='flex flex-row justify-end gap-1'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' onClick={copyInviteLink}>
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='left'>
            <p className='text-xs'>Copy invite link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ControlledDropdown align='end'>
        <DropdownMenuItem
          onClick={() => deleteInvite({ inviteId: id })}
          className='flex flex-col items-start gap-1'>
          Cancel invitation
        </DropdownMenuItem>
      </ControlledDropdown>
    </div>
  );
}
