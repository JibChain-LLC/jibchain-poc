import { Metadata } from 'next';
import { withAuthUser } from '#/components/auth-wrapper';
import CreateOrgForm from './_components/create-org-form';

export const metadata: Metadata = {
  title: 'Create Organization'
};

export default withAuthUser(
  function CreateOrgPage() {
    return (
      <div className=''>
        <h3 className='mb-6 text-center text-2xl font-bold leading-tight'>
          Create Organization
        </h3>
        <CreateOrgForm />
      </div>
    );
  },
  { redirectTo: '/' }
);
