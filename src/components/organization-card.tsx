import 'server-only';

import { and, eq, ne } from 'drizzle-orm';
import { Building } from 'lucide-react';
import { cookies } from 'next/headers';
import { db } from '#/db';
import { organizations, roles } from '#/db/schema/public';
import { trpc } from '#/trpc/query-clients/server';
import { withAuthUser } from './auth-wrapper';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

function OrgItem(props: { dateCreated?: Date; name?: string }) {
  const { dateCreated, name } = props;

  return (
    <>
      <Avatar className='size-[3.25rem]'>
        <AvatarImage src='' alt='Organization' />
        <AvatarFallback>
          <Building className='size-5' />
        </AvatarFallback>
      </Avatar>
      <div className='text-left'>
        <p className='text-sm font-semibold leading-none'>{name}</p>
        <p className='text-sm font-normal text-gray-500'>
          Member since {dateCreated?.getFullYear()}
        </p>
      </div>
    </>
  );
}

export default withAuthUser(async function OrgCard(props) {
  const { user } = props;

  const cookieStore = await cookies();
  const orgId = cookieStore.get('current-org')?.value ?? '';
  if (!orgId) return null;

  const org = await trpc.org.read(orgId);
  const orgList = await db
    .select({
      name: organizations.name,
      id: organizations.id,
      dateCreated: organizations.dateCreated
    })
    .from(roles)
    .where(
      and(
        eq(roles.userId, user.id),
        eq(roles.active, true),
        ne(roles.orgId, orgId)
      )
    )
    .innerJoin(organizations, eq(roles.orgId, organizations.id));

  if (orgList.length === 0) {
    return (
      <Card className='flex'>
        <CardContent className='flex items-center justify-between gap-3'>
          <OrgItem dateCreated={org?.dateCreated} name={org?.name} />
        </CardContent>
      </Card>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Card className='flex'>
          <CardContent className='flex items-center justify-between gap-3'>
            <OrgItem dateCreated={org?.dateCreated} name={org?.name} />
          </CardContent>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[var(--radix-popper-anchor-width)] bg-white'>
        {orgList.map(({ name, id, dateCreated }) => (
          <form
            key={id}
            action={async () => {
              'use server';
              const store = await cookies();
              store.set('current-org', id);
            }}>
            <DropdownMenuItem asChild>
              <button type='submit' className='w-full hover:cursor-pointer'>
                <OrgItem dateCreated={dateCreated} name={name} />
              </button>
            </DropdownMenuItem>
          </form>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
