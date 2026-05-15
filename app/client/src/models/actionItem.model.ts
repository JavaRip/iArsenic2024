import { z } from 'zod';

export const ActionItemSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    userId: z.string(),
    resourceId: z.string().uuid(),
    message: z.string().min(1).max(10000),
    type: z.union([
        z.literal('data-event'),
        z.literal('manual-entry'),
    ])
});

export type ActionItem = z.infer<typeof ActionItemSchema>;