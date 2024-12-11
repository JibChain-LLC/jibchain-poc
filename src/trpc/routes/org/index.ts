import { createOrg } from './org-create';
import { deleteOrg } from './org-delete';
import { acceptInvite } from './org-invite-accept';
import { createInvite } from './org-invite-create';
import { deleteInvite } from './org-invite-delete';
import { getInvites } from './org-invite-list';
import { updateInvite } from './org-invite-update';
import { deleteMember } from './org-member-delete';
import { getMembers } from './org-member-list';
import { updateRole } from './org-member-update';
import { readOrg } from './org-read';

const orgRoutes = {
  create: createOrg,
  read: readOrg,
  delete: deleteOrg,
  member: {
    list: getMembers,
    update: updateRole,
    delete: deleteMember
  },
  invite: {
    list: getInvites,
    accept: acceptInvite,
    create: createInvite,
    update: updateInvite,
    delete: deleteInvite
  }
};

export default orgRoutes;
