import dotenv from 'dotenv';
import { z } from 'zod';

// Load environmental variables
dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL environment variable is required',
  }),
  JWT_SECRET: z.string({
    required_error: 'JWT_SECRET is required to secure authorization tokens',
  }),
  JWT_REFRESH_SECRET: z.string({
    required_error: 'JWT_REFRESH_SECRET is required to secure refresh tokens',
  }),
  JWT_ACCESS_EXPIRATION: z.string().default('15m'),
  JWT_REFRESH_EXPIRATION: z.string().default('7d'),
  COOKIE_SECURE: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),
  COOKIE_SAME_SITE: z.enum(['lax', 'strict', 'none']).default('lax'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default('noreply@enterprise.com'),
  UPLOAD_MAX_SIZE: z.string().transform(Number).default('5242880'),
  ALLOWED_FILE_TYPES: z
    .string()
    .default('image/jpeg,image/png,image/webp,application/pdf')
    .transform((val) => val.split(',')),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment configuration options:');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

export const config = Object.freeze(parsedEnv.data);

export default config;
export type ConfigType = z.infer<typeof envSchema>;
