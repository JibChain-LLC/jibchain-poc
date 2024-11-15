import UserContent from '#/components/defaul-components/user-content';
import OrganizationComponent from '#/components/organication-components/organization-component';
import React from 'react';

const UserOrganization = () => {
  return (
    <>
      <div className='min-h-screen flex'>
        <UserContent />
        <OrganizationComponent />
      </div>
    </>
  );
};

export default UserOrganization;
