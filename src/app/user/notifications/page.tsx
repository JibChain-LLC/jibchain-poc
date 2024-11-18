import React from 'react';
import UserContent from '#/components/defaul-components/user-content';
import NotificationComponent from '#/components/notification-components/notification-component';

const Notification = () => {
  return (
    <>
      <div className='flex min-h-screen'>
        <UserContent />
        <NotificationComponent />
      </div>
    </>
  );
};

export default Notification;
