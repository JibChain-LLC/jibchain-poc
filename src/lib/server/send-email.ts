import { createTransport } from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

type SendEmailOpts = { to: string[]; subject: string } & (
  | { html: string; text?: never }
  | { text: string; html?: never }
);

export default async function sendEmail(opts: SendEmailOpts) {
  const { text, html, to, subject } = opts;

  const transporter = createTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });

  const s = await transporter
    .sendMail({
      to,
      from: `COEUS Risk Solutions ${EMAIL_USER}`,
      subject,
      ...(text ? { text } : {}),
      ...(html ? { html } : {})
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return s;
}
