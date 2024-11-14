import { z } from 'zod';

const createOrgSchema = z.object({
  name: z.string().min(5).max(50)
});

export type CreateOrgSchema = z.infer<typeof createOrgSchema>;
export default createOrgSchema;
