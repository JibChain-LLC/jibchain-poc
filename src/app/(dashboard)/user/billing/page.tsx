import BillingComponent from '#/app/(dashboard)/user/billing/_components/billing-component';
import BillingPaymentsComponent from '#/app/(dashboard)/user/billing/_components/billing-payments-component';
import { BillingHistoryTable } from '#/app/(dashboard)/user/billing/_components/billing-table-component';
import React from 'react';

const UserBilling = () => {
  return (
    <div className="flex h-screen bg-transparent">
      <div className="flex-grow overflow-y-auto  pb-10 rounded-md">
        <BillingComponent />
        <BillingPaymentsComponent />
        <BillingHistoryTable/>
      </div>
    </div>
  );
};

export default UserBilling;
