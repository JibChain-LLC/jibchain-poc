import OrganizationCard from '../organization/organization-card';
import OrganizationRisk from '../organization/organization-risk';
import OrganizationTabs from '../organization/organization-tabs';

export default function OrganizationContent() {
  return (
    <div className='flex flex-col h-full min-w-[400px] max-w-[400px] bg-gray-100 overflow-auto p-6 ml-12'>
      <div className='flex flex-col gap-6 w-auto'>
        <OrganizationCard />
        <OrganizationRisk />
      </div>
      <div className='flex flex-col h-full items-center bg-white overflow-x-hidden shadow-md border-x-[1px] border-gray-200 border-y-0 rounded-t-none rounded-b-lg  p-4'>
        <OrganizationTabs />
      </div>
    </div>
  );
}
