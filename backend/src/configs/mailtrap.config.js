import dotenv from 'dotenv';
dotenv.config();
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};


























// import { MailtrapClient } from "mailtrap";

// const TOKEN = "exampleToken";

// const client = new MailtrapClient({ token: TOKEN });

// const sender = {
//   email: "mailtrap@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "example.email.com",
//   }
// ];

// mailtrapClient.send({
//   from: sender,
//   to: recipients,
//   subject: "You are awesome!",
//   text: "Congrats for sending test email with Mailtrap!",
//   category: "Integration Test",
// })
//   .then(console.log, console.error);
