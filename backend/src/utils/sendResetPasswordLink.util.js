import { mailtrapClient, sender } from "../configs/mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplate.util.js";

async function sendResetPasswordLink(email, resetToken) {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE
        .replace("{resetUrl}", `${process.env.FRONTEND_URL}/change-password/${resetToken}`),
      category: "Email Verification",
    })
  } catch (error) {
    throw new Error("sending reset password link \n", error);
  }
}

export { sendResetPasswordLink }