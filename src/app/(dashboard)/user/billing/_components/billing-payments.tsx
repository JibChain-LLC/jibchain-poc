import React from 'react';
import { Button } from '#/components/ui/button';
import { Label } from '#/components/ui/label';
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group';
import { Switch } from '#/components/ui/switch';
import { paymentSwitches } from '#/utils/utils';
import { paymentMethods } from '#/utils/utils';

const BillingPayments = () => {
  return (
    <div className='w-full space-y-6 pt-12'>
      <hr className='border-gray-200' />
      <p className='text-lg font-bold text-gray-800'>Payment details</p>
      <div className='mt-4 space-y-4'>
        {paymentSwitches.map((item) => (
          <div key={item.id} className='flex items-center justify-between'>
            <div>
              <Label
                htmlFor={item.id}
                className='text-[19px] font-medium text-gray-800'>
                {item.label}
              </Label>
              <p className='text-sm text-gray-600'>{item.description}</p>
            </div>
            <Switch id={item.id} />
          </div>
        ))}
      </div>
      <hr className='border-gray-200' />
      <p className='text-lg font-bold text-gray-800'>Payment methods</p>
      <RadioGroup
        className='mt-4 space-y-4'
        defaultValue={paymentMethods[0].id}>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className='flex flex-col items-start rounded-lg border border-gray-200 bg-gray-100 p-4'>
            <div className='flex items-center space-x-4'>
              <RadioGroupItem id={method.id} value={method.id} />
              <div>
                <Label
                  htmlFor={method.id}
                  className='text-[18px] text-gray-900'>
                  {method.label}
                </Label>
                {method.description && (
                  <p className='text-sm text-gray-600'>{method.description}</p>
                )}
              </div>
            </div>
            <div className='flex items-center'>
              <Button variant='link' size='sm' className='text-gray-600'>
                Delete
              </Button>
              <div className='-mx-2 h-4 border-r border-black opacity-30'></div>
              <Button variant='link' size='sm' className='text-gray-600'>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </RadioGroup>
      <Button
        variant='outline'
        className='mt-4 w-full border-gray-600 bg-transparent text-gray-600'>
        + Add new payment method
      </Button>
      <hr className='border-gray-200 py-3' />
    </div>
  );
};

export default BillingPayments;
