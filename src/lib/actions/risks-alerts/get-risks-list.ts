'use server';

import { ActionRes } from '../types';
import { MOCK_RISKS, MOCK_SUPPLIERS } from './mocks';
import { RiskEntry, RiskLevelEnum, Supplier } from './type';

type DateRangeOpts = {
  from?: string;
  to?: string;
};

interface RiskListRes {
  risks: Record<RiskLevelEnum, Pick<RiskEntry, 'id' | 'category'>[]>;
  count: number;
}

export async function getRisksList(
  opts: DateRangeOpts
): Promise<ActionRes<RiskListRes>> {
  const from = new Date(opts.from ?? Date.now());
  const to = new Date(opts.to ?? Date.now() - 86_400_000);

  if (to.getTime() - from.getTime() < 0)
    return {
      ok: false,
      status: 400,
      message: 'Time range parameters are invalid'
    };

  return {
    ok: true,
    status: 200,
    data: {
      risks: {
        low: [],
        med: [],
        hi: []
      },
      count: 0
    }
  };
}

export async function getRiskContent(): Promise<ActionRes<RiskEntry[]>> {
  return {
    ok: true,
    status: 200,
    data: MOCK_RISKS
  };
}

export async function getSupplierList(): Promise<ActionRes<Supplier[]>> {
  return {
    ok: true,
    status: 200,
    data: MOCK_SUPPLIERS
  };
}
