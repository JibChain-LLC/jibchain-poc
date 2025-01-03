import {
  Construction,
  Database,
  DollarSign,
  Factory,
  Frown,
  LucideIcon,
  Scale,
  TrendingDown,
  TriangleAlert,
  VenetianMask
} from 'lucide-react';
import { IndustryEnum, RiskCategoryEnum, RiskLevelEnum } from './enums';

export const exposureMapping: Record<
  RiskCategoryEnum,
  Record<IndustryEnum, RiskLevelEnum>
> = {
  [RiskCategoryEnum.FIN]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.MED,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.HI,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.ENVIR]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.MED,
    [IndustryEnum.RETAIL]: RiskLevelEnum.LOW,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.MED,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.LOW,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.FINANCE]: RiskLevelEnum.LOW,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.HI,
    [IndustryEnum.TELE]: RiskLevelEnum.LOW
  },
  [RiskCategoryEnum.CYBER]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.RANSOM]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.DATA_BREACH]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.INSIDER]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.LOW,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.THIRD_PARTY]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.FINANCE]: RiskLevelEnum.MED,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.HI,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.NETWORK]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.COMPLIANCE]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.MED,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.PHISHING]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.BRAND]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.COUNTERFEIT]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.LOW,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.FINANCE]: RiskLevelEnum.LOW,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.FIELD_ISSUES]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.LOW,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.FINANCE]: RiskLevelEnum.LOW,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.LABOR]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.LOW,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.FINANCE]: RiskLevelEnum.LOW,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  }
};

const impactAreas: Record<string, { text: string; icon: LucideIcon }> = {
  FINANCIAL_LOSSES: { text: 'Potential Financial Losses', icon: DollarSign },
  OPERATION_DIS: { text: 'Operation Disruptions', icon: Construction },
  DELAYS: { text: 'Production Delays', icon: Factory },
  EMISSIONS: { text: 'Emissions Regulations', icon: Scale },
  REGULATORY: { text: 'Regulatory Compliance Issues', icon: Scale },
  REPUTATION: { text: 'Reputational Damage', icon: TrendingDown },
  IP: { text: 'Intellectual Property Theft', icon: VenetianMask },
  SERVICE_DIS: { text: 'Service Disruption', icon: TriangleAlert },
  OUTAGES: { text: 'Service Outages', icon: TriangleAlert },
  CUSTOMER_DATA: { text: 'Customer Data Exposure', icon: Database },
  INT_FRAUD: { text: 'Internal Fraud', icon: VenetianMask },
  CUSTOMER_DIS: { text: 'Customer Dissatisfaction', icon: Frown },
  QC: { text: 'Quality Control Issues', icon: Factory },
  LEGAL_PEN: { text: 'Legal Penalties', icon: Scale }
} as const;

export const impactAreaMapping: Record<
  RiskCategoryEnum,
  (typeof impactAreas)[string][]
> = {
  [RiskCategoryEnum.FIN]: [
    impactAreas.FINANCIAL_LOSSES,
    impactAreas.OPERATION_DIS,
    impactAreas.DELAYS
  ],
  [RiskCategoryEnum.ENVIR]: [
    impactAreas.EMISSIONS,
    impactAreas.REGULATORY,
    impactAreas.REPUTATION
  ],
  [RiskCategoryEnum.CYBER]: [
    impactAreas.IP,
    impactAreas.SERVICE_DIS,
    impactAreas.REPUTATION
  ],
  [RiskCategoryEnum.RANSOM]: [
    impactAreas.OUTAGES,
    impactAreas.DELAYS,
    impactAreas.FINANCIAL_LOSSES
  ],
  [RiskCategoryEnum.DATA_BREACH]: [
    impactAreas.IP,
    impactAreas.REPUTATION,
    impactAreas.CUSTOMER_DATA
  ],
  [RiskCategoryEnum.INSIDER]: [
    impactAreas.IP,
    impactAreas.INT_FRAUD,
    impactAreas.REPUTATION
  ],
  [RiskCategoryEnum.THIRD_PARTY]: [
    impactAreas.DELAYS,
    impactAreas.CUSTOMER_DIS,
    impactAreas.QC
  ],
  [RiskCategoryEnum.NETWORK]: [
    impactAreas.IP,
    impactAreas.SERVICE_DIS,
    impactAreas.CUSTOMER_DATA
  ],
  [RiskCategoryEnum.COMPLIANCE]: [
    impactAreas.LEGAL_PEN,
    impactAreas.REPUTATION,
    impactAreas.FINANCIAL_LOSSES
  ],
  [RiskCategoryEnum.PHISHING]: [
    impactAreas.IP,
    impactAreas.CUSTOMER_DATA,
    impactAreas.REPUTATION
  ],
  [RiskCategoryEnum.BRAND]: [
    impactAreas.REPUTATION,
    impactAreas.CUSTOMER_DIS,
    impactAreas.IP
  ],
  [RiskCategoryEnum.COUNTERFEIT]: [
    impactAreas.FINANCIAL_LOSSES,
    impactAreas.IP,
    impactAreas.QC
  ],
  [RiskCategoryEnum.LABOR]: [
    impactAreas.REPUTATION,
    impactAreas.CUSTOMER_DIS,
    impactAreas.DELAYS
  ],
  [RiskCategoryEnum.FIELD_ISSUES]: []
};
