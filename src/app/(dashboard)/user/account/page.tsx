import React from 'react';
import AccountComponent from '#/components/account-components/account-component';
import UserContent from '#/components/defaul-components/user-content';

const UserAccount = () => {
  return (
    <>
      <div className='flex min-h-screen'>
        <UserContent />
        <AccountComponent />
      </div>
    </>
  );
};

export default UserAccount;
