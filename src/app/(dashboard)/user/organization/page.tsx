import React from 'react';
import OrganizationComponent from './_components/organization-component';

const UserOrganization = () => {
  return (
    <>
      <div className='flex min-h-screen rounded-md bg-white px-6 py-12 shadow-md lg:px-12 xl:px-32'>
        <OrganizationComponent />
      </div>
    </>
  );
};

export default UserOrganization;
