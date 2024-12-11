import { faker } from '@faker-js/faker';
import {
  RegionEnum,
  RiskCategoryEnum,
  RiskEntry,
  RiskLevelEnum,
  Supplier
} from './types';

function randomArray(from: unknown[], size: number = 2) {
  return Array.from({ length: size }, () => faker.helpers.arrayElement(from));
}

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
    regions: randomArray(Object.keys(RegionEnum), 3) as Supplier['regions'],
    contact: {
      email: faker.internet.email(),
      phone: faker.phone.number()
    }
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
    impactedSuppliers: randomArray(MOCK_SUPPLIERS, 5) as Supplier[],
    summary: {
      title: faker.lorem.sentence(5),
      source: faker.company.name(),
      bodyText: faker.lorem.paragraph(4),
      url: faker.internet.url()
    }
  };
}

export const MOCK_SUPPLIERS = faker.helpers.multiple(createFakeSupplier, {
  count: 25
});

export const MOCK_RISKS = faker.helpers.multiple(createFakeRiskEntry, {
  count: 100
});
