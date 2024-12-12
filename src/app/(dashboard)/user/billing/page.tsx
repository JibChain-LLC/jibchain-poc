import React from 'react';
import BillingComponent from '#/app/(dashboard)/user/billing/_components/billing-content';
import BillingPaymentsComponent from '#/app/(dashboard)/user/billing/_components/billing-payments';
import BillingHistoryTable from './_components/billing-table';

const UserBilling = () => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='grow overflow-y-auto rounded-md px-6 py-12 shadow-md lg:px-12 xl:px-32'>
        <BillingComponent />
        <BillingPaymentsComponent />
        <BillingHistoryTable />
      </div>
    </div>
  );
};

export default UserBilling;
