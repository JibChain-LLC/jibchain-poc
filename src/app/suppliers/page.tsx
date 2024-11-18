import React from 'react';
import SuppliersHeader from '#/components/suppliers-component/suppliers-header';
import { SuppliersTable } from '#/components/suppliers-component/suppliers-table';

const SuppliersPage = () => {
  return (
    <div className='ml-14 bg-gray-100 p-6'>
      <SuppliersHeader />
      <SuppliersTable />
    </div>
  );
};

export default SuppliersPage;
