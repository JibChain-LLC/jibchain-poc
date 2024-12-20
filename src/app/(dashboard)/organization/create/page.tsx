import { Metadata } from 'next';
import { withAuthUser } from '#/components/auth-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import CreateOrgForm from './_components/create-org-form';

export const metadata: Metadata = {
  title: 'Create Organization'
};

export default withAuthUser(function CreateOrgPage() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateOrgForm />
        </CardContent>
      </Card>
    </div>
  );
});
