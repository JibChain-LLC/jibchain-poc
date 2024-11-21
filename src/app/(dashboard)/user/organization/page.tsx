import React from 'react';
import UserContent from '../_components/user-content';
import OrganizationComponent from './_components/organization-component';

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
