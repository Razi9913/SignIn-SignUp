import { mailtrapClient, sender } from "../configs/mailtrap.config.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.util.js";

async function sendPasswordChangedMail(email) {
  const recipients = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Password changed successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password changed successfully",
    })
  } catch (error) {
    throw new Error("Password changed successfully \n", error);
  }
}

export { sendPasswordChangedMail }