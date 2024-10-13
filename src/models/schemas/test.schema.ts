import { z } from 'zod';

export const testSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type TtestSchema = z.infer<typeof testSchema>;
