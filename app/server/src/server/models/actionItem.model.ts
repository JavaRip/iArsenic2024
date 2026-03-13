import { z } from 'zod';

export const ActionItemSchema = z.object({
    createdAt: z.date(),
    id: z.string(),
    message: z.string().min(1).max(10000),
    resourceId: z.string().uuid(),
    type: z.union([
        z.literal('data-event'),
        z.literal('manual-entry'),
    ]),
    userId: z.string(),
});

export type ActionItem = z.infer<typeof ActionItemSchema>;