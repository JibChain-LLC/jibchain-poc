import { db } from '#/db';

export default function getOrganization(orgId: string) {
  return db.query.organizations.findFirst({
    where: (table, { eq }) => eq(table.id, orgId),
    with: {}
  });
}
