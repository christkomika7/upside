import 'dotenv/config';
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        APP_ENV: z.enum(["development", "production"]),
        DATABASE_URL: z
            .string()
            .url()
            .refine((str) => str.startsWith('postgres'), 'Must be a PostgreSQL URL'),
        BETTER_AUTH_URL: z.string().url(),
        EMAIL_SERVER_USER: z.string(),
        EMAIL_SERVER_PASSWORD: z.string(),
        EMAIL_SERVER_HOST: z.string(),
        EMAIL_SERVER_PORT: z.string().transform((val) => Number(val)),
        EMAIL_FROM: z.string(),
        USER_EMAIL: z.string(),
        USER_NAME: z.string(),
        USER_PASSWORD: z.string(),
        GOOGLE_API_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
        NEXT_PUBLIC_USER_EMAIL: z.string(),
        NEXT_PUBLIC_GOOGLE_API_KEY: z.string()
    },
    // experimental__runtimeEnv: process.env,
    runtimeEnv: {
        APP_ENV: process.env.APP_ENV,
        DATABASE_URL: process.env.DATABASE_URL,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
        EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
        EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
        EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
        EMAIL_FROM: process.env.EMAIL_FROM,
        USER_EMAIL: process.env.USER_EMAIL,
        USER_NAME: process.env.USER_NAME,
        USER_PASSWORD: process.env.USER_PASSWORD,
        NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        NEXT_PUBLIC_USER_EMAIL: process.env.NEXT_PUBLIC_USER_EMAIL,
        GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
        NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    },
    emptyStringAsUndefined: true,
});