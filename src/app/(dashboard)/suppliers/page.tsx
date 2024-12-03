import React from 'react';
import SuppliersHeader from './_components/suppliers-header';
import SuppliersTable from './_components/suppliers-table';

const SuppliersPage = () => {
  return (
    <div className='bg-gray-100'>
      <SuppliersHeader />
      <SuppliersTable />
    </div>
  );
};

export default SuppliersPage;
