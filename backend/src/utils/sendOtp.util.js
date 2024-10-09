import { mailtrapClient, sender } from "../configs/mailtrap.config.js";
import { VERIFICATION_CODE_TEMPLATE } from "./emailTemplate.util.js";

async function sendOtp(email, otp, name) {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: VERIFICATION_CODE_TEMPLATE
        .replace("{verificationCode}", otp),
      category: "Email Verification",
    })
  } catch (error) {
    throw new Error("Error sending verification email \n", error);
  }
}

export { sendOtp }