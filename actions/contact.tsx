"use server";
import nodemailer from "nodemailer";
import { contactSchema, ContactSchemaType } from "@/lib/schemas";
import { ContactAdminNotificationEmail } from "@/lib/email-templates";
import { env } from "@/env.config";
import { render } from "@react-email/render";
import { getScopedI18n } from "@/locales/server";

type ActionType = {
  message: string;
  status: boolean;
};

export async function action(data: ContactSchemaType): Promise<ActionType> {
  const t = await getScopedI18n("message.contact");
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return {
      message: t("data"),
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
      <ContactAdminNotificationEmail
        username={data.username}
        email={data.email}
        telephone={data.phone}
        message={data.message}
      />
    );

    const mailOptions = {
      from: `"UPSIDE" ${env.EMAIL_FROM}`,
      to: env.EMAIL_FROM,
      subject: "Nouvelle demande de contact",
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
