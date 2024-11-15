import UserContent from '#/components/defaul-components/user-content';
import NotificationComponent from '#/components/notification-components/notification-component';
import React from 'react';

const Notification = () => {
  return (
    <>
      <div className='min-h-screen flex'>
        <UserContent />
        <NotificationComponent />
      </div>
    </>
  );
};

export default Notification;
