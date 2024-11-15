import SuppliersHeader from '#/components/suppliers-component/suppliers-header';
import { SuppliersTable } from '#/components/suppliers-component/suppliers-table';
import React from 'react';

const SuppliersPage = () => {
  return (
    <div className='bg-gray-100 p-6 ml-14'>
      <SuppliersHeader />
      <SuppliersTable />
    </div>
  );
};

export default SuppliersPage;
