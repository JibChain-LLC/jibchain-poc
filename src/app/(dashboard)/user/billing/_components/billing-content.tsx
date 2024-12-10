import { Check } from 'lucide-react';
import React from 'react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Card } from '#/components/ui/card';
import { Progress } from '#/components/ui/progress';
import { planDetails, billingBenefits, billingActions } from '#/utils/utils';

const BillingContent = () => {
  return (
    <>
      <p className='pb-5 text-[30px] font-bold text-gray-800'>
        Billing & Subscription
      </p>

      <Card className='space-y-6 p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-center gap-2 lg:flex-row'>
            <p className='text-lg font-semibold text-gray-800'>
              {planDetails.name}
            </p>
            <Badge className='bg-green-100 text-green-600'>
              {planDetails.type}
            </Badge>
          </div>
          <span className='text-xl font-bold text-gray-800'>
            {planDetails.price}
          </span>
        </div>

        <p className='text-gray-600'>Renewal Date: {planDetails.renewalDate}</p>

        <div className='flex items-center justify-between space-y-2 text-sm'>
          <span className='text-base text-gray-800'>Suppliers</span>
          <span className='text-gray-600'>
            {planDetails.suppliers.current} of {planDetails.suppliers.total}{' '}
            suppliers
          </span>
        </div>
        <Progress
          value={
            (planDetails.suppliers.current / planDetails.suppliers.total) * 100
          }
          className='h-2 bg-gray-200'
          indicatorColor='bg-green-600'
        />

        <p className='mb-4 text-lg font-semibold text-gray-800'>
          Current plan benefits
        </p>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          {billingBenefits.map((benefit, index) => (
            <span key={index} className='flex items-center gap-1 text-gray-600'>
              <Check color='green' /> {benefit.text}
            </span>
          ))}
        </div>

        <p className='text-2xl text-gray-600'>
          Upgrade to Platinum and increase your supplier limit to 2,000.
        </p>
        <div className='flex flex-col gap-4 lg:flex-row'>
          {billingActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`max-w-[230px] ${action.className}`}>
              {action.text}
            </Button>
          ))}
        </div>
      </Card>
    </>
  );
};

export default BillingContent;
