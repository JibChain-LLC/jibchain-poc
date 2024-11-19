import { withAuthUser } from '#/components/auth-wrapper';
import CreateOrgForm from './_components/create-org-form';

export default withAuthUser(function CreateOrgPage() {
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='w-96 rounded-md border p-4'>
        <p className='text-2xl font-bold'>Create Organization</p>
        <CreateOrgForm />
      </div>
    </div>
  );
});
