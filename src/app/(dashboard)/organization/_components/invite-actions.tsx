import { useQueryClient } from '@tanstack/react-query';
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
import deleteInvitation from '#/lib/actions/invite/delete-invite';
import ControlledDropdown from './controlled-dropdown';

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
          onClick={handleDeleteInvite}
          className='flex flex-col items-start gap-1'>
          Cancel invitation
        </DropdownMenuItem>
      </ControlledDropdown>
    </div>
  );
}
