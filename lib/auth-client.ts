import { env } from "@/env.config";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL
});