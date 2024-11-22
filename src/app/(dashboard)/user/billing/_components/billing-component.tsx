import React from 'react';
import { Button } from '#/components/ui/button';
import { Progress } from '#/components/ui/progress';
import { Badge } from '#/components/ui/badge';

const BillingComponent = () => {
  const planDetails = {
    name: 'Pro Plan',
    type: 'Essentials',
    price: '$1,300/month',
    renewalDate: 'Dec 01 2024',
    suppliers: {
      current: 243,
      total: 500
    }
  };

  const benefits = [
    { text: 'Number of suppliers: 500' },
    { text: 'Team size: 10' },
    { text: 'Mitigation strategies' },
    { text: 'Comprehensive reporting' },
    { text: 'Unlimited tracking' },
    { text: 'Scenario planning' },
    { text: 'Phone support' }
  ];

  const actions = [
    {
      text: 'Cancel Subscription',
      variant: 'outline',
      className: 'border-green-700 border bg-gray-100 text-green-700 hover:bg-gray-200'
    },
    {
      text: 'Upgrade to Platinum',
      variant: 'default',
      className: 'bg-green-700 text-white hover:bg-green-600'
    }
  ];

  return (
    <div className='w-full overflow-y-auto bg-gray-100'>
      <div className='rounded-b-none rounded-t-md bg-white px-6 pt-12 shadow-md lg:px-12 xl:px-32'>
        <h2 className='pb-5 text-2xl font-bold text-gray-800'>
          Billing & Subscription
        </h2>

        <div className='space-y-6 rounded-md border border-gray-200 p-8 shadow-md'>
          <div className='flex items-center justify-between'>
            <div className='flex lg:flex-row flex-col items-center gap-2'>
              <h3 className='text-lg font-semibold text-gray-800'>
                {planDetails.name}
              </h3>
              <Badge className='bg-green-100 text-green-600'>
                {planDetails.type}
              </Badge>
            </div>
            <div className='text-xl font-bold text-gray-800'>
              {planDetails.price}
            </div>
          </div>

          <p className='text-gray-600'>
            Renewal Date: {planDetails.renewalDate}
          </p>

          <div>
            <div className='mb-2 flex items-center justify-between text-sm'>
              <span className='text-base text-gray-800'>Suppliers</span>
              <span className='text-gray-600'>
                {planDetails.suppliers.current} of {planDetails.suppliers.total}{' '}
                suppliers
              </span>
            </div>
            <Progress
              value={
                (planDetails.suppliers.current / planDetails.suppliers.total) *
                100
              }
              className='h-2 bg-gray-200'
              indicatorColor='bg-green-600'
            />
          </div>

          <div>
            <h4 className='mb-4 text-lg font-semibold text-gray-800'>
              Current plan benefits
            </h4>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
              {benefits.map((benefit, index) => (
                <div key={index} className='text-gray-600'>
                  <span className='text-green-700'>✔ </span>
                  {benefit.text}
                </div>
              ))}
            </div>
          </div>
          <div className='space-y-4'>
            <p className='text-2xl text-gray-600'>
              Upgrade to Platinum and increase your supplier limit to 2,000.
            </p>
            <div className='flex lg:flex-row flex-col gap-4'>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  className={`max-w-[230px] ${action.className}`}>
                  {action.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
