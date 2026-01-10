import { env } from "@/env.config";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function main() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: env.USER_EMAIL,
    },
  });

  if (
    existingUser &&
    existingUser.email !== env.USER_EMAIL &&
    existingUser.emailVerified
  ) {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        email: env.USER_EMAIL,
      },
    });
    return console.log("Le seed à été modifié avec succès.");
  }

  if (!existingUser) {
    const response = await auth.api.signUpEmail({
      body: {
        email: env.USER_EMAIL,
        password: env.USER_PASSWORD,
        name: env.USER_NAME,
      },
    });
    if (response.user) {
      await prisma.user.update({
        where: {
          id: response.user.id,
        },
        data: {
          emailVerified: true,
        },
      });
      return console.log("Le seed à été réalisé avec succès.");
    }
    console.log("Erreur lors de la réalisation du seed.");
  }
  return console.log("Seed déjà réalisé auparavant");
}
main();
