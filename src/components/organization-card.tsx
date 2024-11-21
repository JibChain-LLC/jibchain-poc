import 'server-only';

import { cookies } from 'next/headers';
import getOrganization from '#/lib/actions/organization/read-org';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';

export default async function OrgCard() {
  const cookieStore = await cookies();
  const orgId = cookieStore.get('current-org')?.value ?? '';
  if (!orgId) return null;
  const org = await getOrganization(orgId);

  return (
    <Card className='flex'>
      <CardContent className='flex items-center justify-between gap-3'>
        <Avatar className='size-[3.25rem]'>
          <AvatarImage src='https://github.com/shadcn.png' alt='Organization' />
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-sm font-semibold leading-none'>{org?.name}</p>
          <p className='text-sm font-normal text-gray-500'>
            Member since {org?.dateCreated.getFullYear()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
