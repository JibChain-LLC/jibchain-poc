import AccountComponent from '#/components/account-components/account-component';
import UserContent from '#/components/defaul-components/user-content';
import React from 'react';

const UserAccount = () => {
  return (
    <>
      <div className='min-h-screen flex'>
        <UserContent />
        <AccountComponent />
      </div>
    </>
  );
};

export default UserAccount;
