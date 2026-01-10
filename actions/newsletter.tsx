"use server";
import { env } from "@/env.config";
import { NewsletterAdminNotificationEmail } from "@/lib/email-templates";
import { emailSchema } from "@/lib/schemas";
import { getScopedI18n } from "@/locales/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

type ActionType = {
  message: string;
  status: boolean;
};

export async function action(email: string): Promise<ActionType> {
  const result = emailSchema.safeParse({ email });
  const t = await getScopedI18n("message.newsletter");
  if (!result.success) {
    return {
      message: t("email"),
      status: false,
    };
  }
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER_HOST,
    port: env.EMAIL_SERVER_PORT || 587,
    secure: false,
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    const htmlContent = await render(
      <NewsletterAdminNotificationEmail userEmail={email} />
    );

    const mailOptions = {
      from: `"UPSIDE" ${env.EMAIL_FROM}`,
      to: env.EMAIL_FROM,
      subject: "Abonnement à la newsletter",
      html: htmlContent,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.messageId);
    return {
      message: t("success"),
      status: true,
    };
  } catch (e) {
    console.error("Erreur d'envoi:", e);
    return {
      message: t("error"),
      status: false,
    };
  }
}
