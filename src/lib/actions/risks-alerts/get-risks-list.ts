'use server';

import { ActionRes } from '../types';

interface GetRisksOpts {}

enum RiskLevelEnum {
  LOW = 'low',
  MED = 'med',
  HI = 'hi'
}

type RiskItem = {
  id: string;
  category: string;
  level: RiskLevelEnum;
};

const mockData = [];

export default async function getRisksList(
  _opts: GetRisksOpts
): Promise<ActionRes<RiskItem[]>> {
  const risks: RiskItem[] = [
    {
      category: 'test',
      level: RiskLevelEnum.HI,
      id: 'test'
    }
  ];

  return {
    ok: true,
    status: 200,
    data: risks
  };
}
