import nodemailer from "nodemailer";
import { env } from "@/env.config";
import { render } from "@react-email/render";
import { cookies } from "next/headers";
import { ResetPasswordEmailTemplate } from "./email-templates";

export async function sendEmail(
  email: string,
  path: string,
  subject: string,
  type: string
) {
  const cookieStore = await cookies();
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER_HOST,
    port: env.EMAIL_SERVER_PORT,
    secure: false,
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    let emailHtml: string = "";

    switch (type) {
      case "password":
        emailHtml = await render(
          <ResetPasswordEmailTemplate
            resetLink={`${env.BETTER_AUTH_URL}${path}`}
            userName="Upside"
          />,
          { pretty: true }
        );
        break;
    }

    const mailOptions = {
      from: `"Upside" ${env.EMAIL_FROM}`,
      to: email,
      subject: subject,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    cookieStore.set("status", "sent");
    return true;
  } catch (e) {
    cookieStore.set("status", "failed");
    console.error({ e: e });
    return false;
  }
}
