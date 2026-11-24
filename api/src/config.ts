import { z } from 'zod';

/**
 * Environment contract of the API (see `.env.example`).
 * `DATABASE_URL` and `JWT_SECRET` are validated when present; the tasks that
 * add the database and authentication make them required.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(16).optional(),
  LOGIN_RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(1).default(5),
});

export type Config = z.infer<typeof envSchema>;

/**
 * Reads and validates the environment. Throws an error that names the invalid
 * variables but never prints their values (they may be secrets).
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration – ${problems}`);
  }
  return result.data;
}
