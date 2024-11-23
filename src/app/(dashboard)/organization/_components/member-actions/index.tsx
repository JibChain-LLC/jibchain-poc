import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '#/components/ui/dialog';
import { DropdownMenuItem } from '#/components/ui/dropdown-menu';
import useUserMetadata from '#/hooks/use-user-metadata';
import { Member } from '#/lib/actions/organization/read-org-members';
import ControlledDropdown from '../controlled-dropdown';
import RemoveUserDialog from './remove-user-dialog';
import ToggleActivationDialog from './toggle-activation-dialog';

type MemberActionsProps = Omit<Member, 'lastSignIn'> & {
  orgId: string;
  hasAdminPriv: boolean;
};

export default function MemberActions(props: MemberActionsProps) {
  const { id, orgId, active, hasAdminPriv } = props;

  const [dialog, setDialog] = useState<'activate' | 'remove'>('activate');
  const userData = useUserMetadata();
  const isYou = id === userData?.id;

  return (
    <div className='flex justify-end'>
      <Dialog>
        <ControlledDropdown align='end'>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => setDialog('activate')}
              disabled={!hasAdminPriv}>
              {active ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              disabled={!hasAdminPriv && !isYou}
              onClick={() => setDialog('remove')}>
              {isYou ? 'Leave organization' : 'Remove member'}
            </DropdownMenuItem>
          </DialogTrigger>
        </ControlledDropdown>
        <DialogContent>
          {dialog === 'activate' ? (
            <ToggleActivationDialog userId={id} orgId={orgId} active={active} />
          ) : (
            <RemoveUserDialog userId={id} orgId={orgId} isYou={isYou} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
