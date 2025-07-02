"use server";
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
});

export async function sendEmail(email: string, subject: string, emailHtml: string) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `${emailHtml}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

/*

import { Resend } from 'resend';
const resend = new Resend('re_aPNQpdKx_EJj8bEKA293JFRRp6g1uqmCM');
resend.apiKeys.create({ name: 'Production' });

export async function sendEmail(email: string, subject: string, emailHtml: string) {

  const { data, error } = await resend.emails.send({
    from: 'Maicon <maicongobbi@gmail.com>',
    to: ['maicongobbi@gmail.com'],
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
}; */
