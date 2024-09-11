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
        .replace("{resetUrl}", resetToken),
      category: "Email Verification",
    })

    console.log("sending reset password link", response);
  } catch (error) {
    console.log(`sending reset password link ${error}`);

    throw new Error("sending reset password link \n", error);
  }
}

export { sendResetPasswordLink }