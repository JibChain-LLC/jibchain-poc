import 'server-only';

import { withAuthUser } from '#/components/auth-wrapper';
import InviteForm from '#/components/invite-form/invite-form';
import { Badge } from '#/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table';
import getUserCurrentOrg from '#/lib/actions/get-current-org';
import getInvites from '#/lib/actions/get-invites';
import getOrgMembers from '#/lib/actions/get-org-members';
import getOrganization from '#/lib/actions/get-organization';

export default withAuthUser(
  async (props) => {
    const { user } = props;

    const currentOrgId = await getUserCurrentOrg(user.id);
    const members = await getOrgMembers(currentOrgId);
    const org = await getOrganization(currentOrgId);
    const isOwner = org?.ownerId === user.id;

    const invites = await getInvites(currentOrgId);

    return (
      <div>
        <p>{org?.name}</p>
        <p>{currentOrgId}</p>
        {isOwner && <p>You are the owner of this organization</p>}
        <h2 className='text-2xl font-bold'>Role Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => {
              const { userId, email, role } = m;

              return (
                <TableRow key={userId}>
                  <TableCell>
                    {email}
                    {user.id === userId && <Badge className='ml-3'>You</Badge>}
                  </TableCell>
                  <TableCell>{userId}</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <h2 className='text-2xl font-bold'>Invites Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Invite ID</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((i) => {
              const { email, role, id } = i;

              return (
                <TableRow key={email}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <InviteForm orgId={currentOrgId} />
      </div>
    );
  },
  { redirectTo: '/login' }
);
