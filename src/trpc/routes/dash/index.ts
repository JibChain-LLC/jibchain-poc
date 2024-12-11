import { getRisks } from './dash-risks-list';
import { readRisk } from './dash-risks-read';
import { getSuppliers } from './dash-suppliers-list';
import { readSupplier } from './dash-suppliers-read';

const dashboardRoutes = {
  risks: {
    read: readRisk,
    list: getRisks
  },
  suppliers: {
    read: readSupplier,
    list: getSuppliers
  }
};

export default dashboardRoutes;
