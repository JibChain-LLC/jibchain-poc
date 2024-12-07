import { getRisks } from './dash-risks-list';
import { readRisk } from './dash-risks-read';
import { getSuppliers } from './dash-suppliers-list';

const dashboardRoutes = {
  risks: {
    read: readRisk,
    list: getRisks
  },
  suppliers: {
    list: getSuppliers
  }
};

export default dashboardRoutes;
