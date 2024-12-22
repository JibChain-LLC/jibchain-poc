import type { users } from '#/db/schema/auth';
import type { roles } from '#/db/schema/public';

export type Member = Omit<typeof users.$inferSelect, 'userMetadata'> &
  Pick<typeof roles.$inferSelect, 'role' | 'active'> &
  Partial<typeof users.$inferSelect.userMetadata>;
