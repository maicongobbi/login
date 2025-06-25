'use server'
import { Resend } from 'resend';

/* export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  tls: { rejectUnauthorized: false },
  secure: false,
});
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email: string, subject: string, emailHtml: string) {

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    html: `<strong>${emailHtml}</strong>`,
  });
  console.log('Email sent successfully:', data);
  console.log('Email error:', error);

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }


  console.log('erro ao enviar email', error);



};
