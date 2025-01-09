import 'server-only';

import React from 'react';
import { trpc } from '#/trpc/query-clients/server';
import SuppliersHeader from './_components/suppliers-header';
import SuppliersTable from './_components/suppliers-table';

export default async function SuppliersPage() {
  const supplierList = await trpc.dash.suppliers.list({
    offset: 0,
    limit: 100
  });

  return (
    <div>
      <SuppliersHeader supplierList={supplierList} />
      <SuppliersTable supplierList={supplierList} />
    </div>
  );
}
