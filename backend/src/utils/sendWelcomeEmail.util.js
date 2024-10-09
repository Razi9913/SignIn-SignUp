import { mailtrapClient, sender } from "../configs/mailtrap.config.js";

async function sendWelcomeEmail(email, fullName) {
  const recipients = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "4e9d73af-4905-42c6-af57-c20dcfe8a044",
      template_variables: {
        "company_info_name": "Razi Demo Project",
        "name": fullName,
        "company_info_address": "",
        "company_info_city": "Mumbai",
        "company_info_zip_code": "400043",
        "company_info_country": "India"
      },
    })
  } catch (error) {
    throw new Error("Error sending welcome email \n", error);
  }
}

export { sendWelcomeEmail }