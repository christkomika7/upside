"use server";
import nodemailer from "nodemailer";
import { contactSchema, HouseSchemaType } from "@/lib/schemas";
import { AskAdminNotificationEmail } from "@/lib/email-templates";
import { env } from "@/env.config";
import { render } from "@react-email/render";
import { getScopedI18n } from "@/locales/server";
import { getFrPropertyType } from "@/lib/utils";

type ActionType = {
  message: string;
  status: boolean;
};

export async function action(data: HouseSchemaType): Promise<ActionType> {
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
      <AskAdminNotificationEmail
        property={getFrPropertyType(data.property)}
        city={data.city}
        area={data.district}
        bedroom={data.bedrooms}
        bathroom={data.bathrooms}
        status={data.status}
        username={data.username}
        email={data.email}
        phone={data.phone}
        message={data.message}
      />
    );

    const mailOptions = {
      from: `"UPSIDE" ${env.EMAIL_FROM}`,
      to: env.EMAIL_FROM,
      subject: "Nouvelle demande",
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
