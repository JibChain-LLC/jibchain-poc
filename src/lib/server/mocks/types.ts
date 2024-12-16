import { RegionEnum, RiskCategoryEnum, RiskLevelEnum } from '#/enums';

export type RiskEntry = {
  id: string;
  category: RiskCategoryEnum;
  level: RiskLevelEnum;
  probability: number;
  financialImpact: number;
  impactedSuppliers: Supplier[];
  date: Date;
  summary: {
    title: string;
    source: string;
    bodyText: string;
    url: string;
  };
  bestPractice: string;
  justification: string;
  planning: Record<
    1 | 2 | 3,
    {
      confidence: number;
      implementationTime: number;
      cost: number;
      scenario: string;
      strategy: string;
    }
  >;
};

export type Address = {
  premise: string;
  thoroughfare: string;
  locality: string;
  postalCode: string;
  administrativeArea: string;
  country: string;
  latLong: [number, number];
};

export type Supplier = {
  id: string;
  name: string;
  address: Address;
  regions: (keyof typeof RegionEnum)[];
  contact: {
    email: string;
    phone: string;
  };
  exposure: RiskLevelEnum;
  impact: RiskLevelEnum;
};
