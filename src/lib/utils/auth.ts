import { sendEmail } from "@/lib/email/email";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
//import prisma from "../../src/lib/prisma";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,

    requireEmailVerification: true,
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,

      sendVerificationEmail: async (
        { user, url, token }: { user: { email: string }; url: string; token: string },
        request: any
      ) => {
        console.log('Requisição de verificação de email:', request);
        console.log('Token de verificação:', token);

        console.log('Usuário:', user);
        console.log('URL de verificação:', url);
        console.log('Enviando email de verificação:', user);
        await sendEmail(user.email, "Verify your email address", `Click the link to verify your email: ${url}`);
      }
    },
    async sendResetPassword({ user, url }) {
      console.log('\n\n\n\nRequisição de reset de senha:', user);
      await sendEmail(user.email, "Reset de senha", `Clique no link para resetar sua senha: ${url} <br/> Se você não solicitou essa alteração, ignore este email. <br/>Você tem 3 horas para completar a alteração de senha.`);
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 3,
  },
  account: {
    accountLinking: {
      enabled: true,
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!
    }
  },

  plugins: [
    /*  emailOTP({
       async sendVerificationOTP({
         email,
         otp,
         type
       }) {
         if (type === "sign-in") {
           await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);
         } else if (type === "email-verification") {
           await sendEmail(email, "Your Email Verification Code", `Your email verification code is: ${otp}`);
         } else {
           await sendEmail(email, "Your Password Reset Code", `Your password reset code is: ${otp}`);
         }
       },
     }), */

    // make sure this is the last plugin in the array
    nextCookies()
  ]

});
