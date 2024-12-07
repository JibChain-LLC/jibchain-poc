import type { users } from '#/db/auth-schema';
import type { roles } from '#/db/schema';

export type Member = Omit<typeof users.$inferSelect, 'userMetadata'> &
  Pick<typeof roles.$inferSelect, 'role' | 'active'> &
  Partial<typeof users.$inferSelect.userMetadata>;
