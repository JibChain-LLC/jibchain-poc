import OrganizationCard from '../organization/organization-card';
import OrganizationRisk from '../organization/organization-risk';
import OrganizationTabs from '../organization/organization-tabs';

export default function OrganizationContent() {
  return (
    <div className='flex h-full min-w-[400px] max-w-[400px] flex-col overflow-auto pr-6'>
      <div className='flex w-auto flex-col gap-6'>
        <OrganizationCard />
        <OrganizationRisk />
      </div>
      <div className='flex h-full flex-col items-center overflow-x-hidden rounded-b-lg rounded-t-none border-x border-y-0 border-gray-200 bg-white p-4 shadow-md'>
        <OrganizationTabs />
      </div>
    </div>
  );
}
