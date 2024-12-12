import { z } from 'zod';
import { db } from '#/db';
import { authProcedure } from '#/trpc/init';

export const readOrg = authProcedure
  .input(z.string().uuid())
  .query(async (opts) => {
    const orgId = opts.input;

    return db.query.organizations.findFirst({
      where: (table, { eq }) => eq(table.id, orgId),
      with: {}
    });
  });
