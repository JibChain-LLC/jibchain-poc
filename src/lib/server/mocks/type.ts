export enum RiskLevelEnum {
  LOW = 'low',
  MED = 'med',
  HI = 'hi'
}

export enum RiskCategoryEnum {
  CLOUD = 'Cloud Service',
  RANSOMEWARE = 'Ransomware Attack',
  INTERNAL_SECURITY_FAILURES = 'Internal Security Failures',
  NATURAL_DISASTER = 'Natural Disaster',
  TERRORISM = 'Terrorism',
  CYBERSECURITY = 'Cybersecurity',
  TECH_FAILURE = 'Technology Failure',
  PUBLIC_HEALTH = 'Public Health',
  ECON_DOWNTURN = 'Economic Downturn',
  ENVIRONMENT = 'Environmental',
  SUPPLY_CHAIN = 'Supply Chain',
  REGULATORY = 'Regulatory Changes',
  POLITICAL = 'Political',
  COUNTERFEIT = 'Counterfeit Parts',
  SDLC = 'SDLC Processes',
  LABOR = 'Labor Strike'
}

export enum RegionEnum {
  AF = 'Africa',
  AN = 'Antartica',
  AS = 'Asia',
  EU = 'Europe',
  NA = 'North America',
  OC = 'Oceania',
  SA = 'South America'
}

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
};
