import React from 'react';
import UserContent from '#/components/defaul-components/user-content';
import OrganizationComponent from '#/components/organication-components/organization-component';

const UserOrganization = () => {
  return (
    <>
      <div className='flex min-h-screen'>
        <UserContent />
        <OrganizationComponent />
      </div>
    </>
  );
};

export default UserOrganization;
