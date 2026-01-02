import { z } from 'zod';

export const LanguageSchema = z.enum(['english', 'bengali']);
export type Language = z.infer<typeof LanguageSchema>;

export const UnitsSchema = z.enum(['meters', 'feet']);
export type Units = z.infer<typeof UnitsSchema>;

export const UserSchema = z.object({
    avatarUrl: z.string().optional(),
    createdAt: z.date(),
    email: z.string(),
    emailVerified: z.boolean(),
    id: z.string(),
    language: LanguageSchema,
    name: z.string(),
    password: z.string().optional(),
    type: z.enum(['admin', 'user']),
    units: UnitsSchema,
});

export type User = z.infer<typeof UserSchema>;

export const LoginRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const RegisterRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    language: LanguageSchema,
    units: UnitsSchema,
})

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>