import OrganizationCard from '#/components/organization-card';
import UserContentNav from './_components/user-content-nav';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout(props: UserLayoutProps) {
  const { children } = props;

  return (
    <div className='grid h-[calc(100vh-2.5rem)] grid-cols-[336px_1fr] grid-rows-1 gap-4 overflow-y-hidden'>
      <div className='flex flex-col gap-4'>
        <OrganizationCard />
        <UserContentNav />
      </div>
      <div className='overflow-y-hidden'>{children}</div>
    </div>
  );
}
