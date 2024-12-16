import { faker } from '@faker-js/faker';
import { RegionEnum, RiskCategoryEnum, RiskLevelEnum } from '#/enums';
import { RiskEntry, Supplier } from './types';

function createFakeSupplier(): Supplier {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    address: {
      premise: faker.location.buildingNumber(),
      thoroughfare: faker.location.street(),
      locality: faker.location.city(),
      postalCode: faker.location.zipCode(),
      administrativeArea: faker.location.state(),
      country: faker.location.countryCode('alpha-2'),
      latLong: [faker.location.latitude(), faker.location.longitude()]
    },
    regions: faker.helpers.arrayElements(
      Object.keys(RegionEnum),
      3
    ) as Supplier['regions'],
    contact: {
      email: faker.internet.email(),
      phone: faker.phone.number()
    },
    exposure: faker.helpers.enumValue(RiskLevelEnum),
    impact: faker.helpers.enumValue(RiskLevelEnum)
  };
}

function createFakeRiskEntry(): RiskEntry {
  return {
    id: faker.string.uuid(),
    date: faker.date.between({
      from: Date.now() - 10 * 86_400_000,
      to: Date.now()
    }),
    category: faker.helpers.arrayElement(Object.values(RiskCategoryEnum)),
    level: faker.helpers.arrayElement(Object.values(RiskLevelEnum)),
    probability: faker.number.float({ min: 0.1, max: 1.0 }),
    financialImpact: faker.number.int({ min: 10_000, max: 15_000_000 }),
    impactedSuppliers: faker.helpers.arrayElements(MOCK_SUPPLIERS, 5),
    summary: {
      title: faker.lorem.sentence(5),
      source: faker.company.name(),
      bodyText: faker.lorem.paragraph(4),
      url: faker.internet.url()
    },
    bestPractice: faker.lorem.paragraph(4),
    justification: faker.lorem.paragraph(4),
    planning: {
      1: {
        confidence: faker.number.float({ min: 0.1, max: 1.0 }),
        implementationTime: faker.number.int({ min: 1, max: 6 }),
        cost: faker.number.int({ min: 20_000, max: 2_200_000 }),
        scenario: faker.lorem.paragraph(5),
        strategy: faker.lorem.paragraph(5)
      },
      2: {
        confidence: faker.number.float({ min: 0.1, max: 1.0 }),
        implementationTime: faker.number.int({ min: 1, max: 6 }),
        cost: faker.number.int({ min: 20_000, max: 2_200_000 }),
        scenario: faker.lorem.paragraph(5),
        strategy: faker.lorem.paragraph(5)
      },
      3: {
        confidence: faker.number.float({ min: 0.1, max: 1.0 }),
        implementationTime: faker.number.int({ min: 1, max: 6 }),
        cost: faker.number.int({ min: 20_000, max: 2_200_000 }),
        scenario: faker.lorem.paragraph(5),
        strategy: faker.lorem.paragraph(5)
      }
    }
  };
}

export const MOCK_SUPPLIERS = Object.freeze(
  faker.helpers.multiple(createFakeSupplier, {
    count: 25
  })
);

export const MOCK_RISKS = Object.freeze(
  faker.helpers.multiple(createFakeRiskEntry, {
    count: 100
  })
);
