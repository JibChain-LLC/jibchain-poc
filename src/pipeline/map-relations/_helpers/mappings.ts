import { IndustryEnum, RiskCategoryEnum, RiskLevelEnum } from '#/enums';

export const exposureMapping: Record<
  RiskCategoryEnum,
  Partial<Record<IndustryEnum, RiskLevelEnum>>
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
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.RANSOM]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.DATA_BREACH]: {
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.INSIDER]: {
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.THIRD_PARTY]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.HI,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
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
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.PHISHING]: {
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
    [IndustryEnum.RETAIL]: RiskLevelEnum.MED,
    [IndustryEnum.ENERGY]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.HI,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.BRAND]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.MED,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.HI,
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
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.MED,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.LABOR]: {
    [IndustryEnum.AUTOMOTIVE]: RiskLevelEnum.HI,
    [IndustryEnum.ELECTRONICS]: RiskLevelEnum.MED,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.LOW,
    [IndustryEnum.MANUFACTURING]: RiskLevelEnum.MED,
    [IndustryEnum.TELE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.POLITICAL]: {
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.HI,
    [IndustryEnum.EDUCATION]: RiskLevelEnum.MED,
    [IndustryEnum.DEFENSE]: RiskLevelEnum.HI,
    [IndustryEnum.FINANCE]: RiskLevelEnum.MED
  },
  [RiskCategoryEnum.HEALTH]: {
    [IndustryEnum.HEALTHCARE]: RiskLevelEnum.HI,
    [IndustryEnum.GOVERMENT]: RiskLevelEnum.MED
  }
};
