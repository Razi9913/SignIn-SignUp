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

// const TOKEN = "512a8dc3aef3f481ce04f29157266ee9";

// const client = new MailtrapClient({ token: TOKEN });

// const sender = {
//   email: "mailtrap@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "skrazi9913@gmail.com",
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