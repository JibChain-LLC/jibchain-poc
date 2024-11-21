import React from 'react';
import { Button } from '#/components/ui/button';
import { Card, CardContent } from '#/components/ui/card';
import { Checkbox } from '#/components/ui/checkbox';
import { Switch } from '#/components/ui/switch';
import {
  emailNotifications,
  notifications,
  subscribeNotifications
} from '#/utils/utils';

const Notification = () => {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-col gap-10'>
          <div className='flex items-center justify-between'>
            <span className='flex flex-col gap-8'>
              <p className='text-[30px] font-bold text-black'>Notifications</p>
              <p className='text-[19px] font-bold text-black'>
                Alerts & Notifications
              </p>
            </span>
            <p className='cursor-pointer text-green-800'>Select All</p>
          </div>
          {notifications.map((notification, index) => (
            <div key={index} className='flex items-start gap-3 text-black'>
              <Switch />
              <span className='flex flex-col'>
                <p>{notification.title}</p>
                <p>{notification.description}</p>
              </span>
            </div>
          ))}
          <div className='flex items-center justify-between'>
            <span className='flex flex-col gap-8'>
              <p className='text-[19px] font-bold text-black'>
                Email me when:{' '}
              </p>
            </span>
            <p className='cursor-pointer text-green-800'>Select All</p>
          </div>
          <div className='flex flex-col gap-6'>
            {emailNotifications.map((emailNotification, index) => (
              <span key={index} className='flex items-center gap-2 text-black'>
                <Checkbox />
                <p>{emailNotification}</p>
              </span>
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <span className='flex flex-col gap-8'>
              <p className='text-[19px] font-bold text-black'>
                Subscribe me to:{' '}
              </p>
            </span>
            <p className='cursor-pointer text-green-800'>Select All</p>
          </div>
          <div className='flex flex-col gap-6'>
            {subscribeNotifications.map((subscribeNotifications, index) => (
              <span key={index} className='flex items-start gap-2 text-black'>
                <Checkbox />
                <span className='-mt-1 flex flex-col'>
                  <p className='text-[17px]'>{subscribeNotifications.title}</p>
                  <p className='text-[14px] text-gray-400'>
                    {subscribeNotifications.description}
                  </p>
                </span>
              </span>
            ))}
          </div>
          <Button className='my-4 max-w-[120px] bg-green-700 p-4 text-white hover:bg-green-600'>
            Save changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notification;
