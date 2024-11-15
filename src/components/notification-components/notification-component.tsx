import React from 'react';
import { Switch } from '#/components/ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import {
  emailNotifications,
  notifications,
  subscribeNotifications
} from '#/utils/utils';

const NotificationComponent = () => {
  return (
    <div className='bg-gray-100 max-h-screen p-6 overflow-y-auto w-full'>
      <div className='p-32 bg-white shadow-md rounded-md'>
        <div className='flex flex-col gap-10'>
          <div className='flex justify-between items-center'>
            <span className='flex flex-col gap-8'>
              <p className='text-black font-bold text-[30px]'>Notifications</p>
              <p className='text-black font-bold text-[19px]'>
                Alerts & Notifications
              </p>
            </span>
            <p className='text-green-800 cursor-pointer'>Select All</p>
          </div>
          {notifications.map((notification, index) => (
            <div key={index} className='flex items-start text-black gap-3'>
              <Switch />
              <span className='flex flex-col'>
                <p>{notification.title}</p>
                <p>{notification.description}</p>
              </span>
            </div>
          ))}
          <div className='flex justify-between items-center'>
            <span className='flex flex-col gap-8'>
              <p className='text-black font-bold text-[19px]'>
                Email me when:{' '}
              </p>
            </span>
            <p className='text-green-800 cursor-pointer'>Select All</p>
          </div>
          <div className='flex flex-col gap-6'>
            {emailNotifications.map((emailNotification, index) => (
              <span key={index} className='flex items-center text-black gap-2'>
                <Checkbox />
                <p>{emailNotification}</p>
              </span>
            ))}
          </div>
          <div className='flex justify-between items-center'>
            <span className='flex flex-col gap-8'>
              <p className='text-black font-bold text-[19px]'>
                Subscribe me to:{' '}
              </p>
            </span>
            <p className='text-green-800 cursor-pointer'>Select All</p>
          </div>
          <div className='flex flex-col gap-6'>
            {subscribeNotifications.map((subscribeNotifications, index) => (
              <span key={index} className='flex items-start text-black gap-2'>
                <Checkbox />
                <span className='flex flex-col -mt-1'>
                  <p className='text-[17px]'>{subscribeNotifications.title}</p>
                  <p className='text-[14px] text-gray-400'>
                    {subscribeNotifications.description}
                  </p>
                </span>
              </span>
            ))}
          </div>
          <Button className='bg-green-700 hover:bg-green-600 text-white p-4 my-4 max-w-[120px]'>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
