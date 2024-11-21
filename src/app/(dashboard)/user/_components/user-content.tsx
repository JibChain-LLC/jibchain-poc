import 'server-only';

import OrganizationCard from '#/components/organization-card';
import UserContentNav from './user-content-nav';

export default function UserContent() {
  return (
    <div className='flex flex-col gap-4'>
      <OrganizationCard />
      <UserContentNav />
    </div>
  );
}
