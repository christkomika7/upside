import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { headers } from "next/headers";
import { customSession, } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "./email";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [
        nextCookies(),
        customSession(async ({ user, session }) => {
            // const updateUser = await prisma.user.findUnique({where: {
            //     id: user.id
            // }})
            return {
                user: {
                    ...user,
                },
                session
            }

        })
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, token }) => {
            await sendEmail(
                user.email,
                `/account/admin/password/reset?token=${token}`,
                "Réinitialisation du mot de passe",
                "password",
            )
        },
    }
    ,
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds
        },
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        updateAge: 60 * 60 * 24, // every 1 day the session expiration is updated
    },
});


export type AuthSession = typeof auth.$Infer.Session


export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers()
    })
})