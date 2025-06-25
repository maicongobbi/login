import { sendEmail } from "@/lib/email/email";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
//import prisma from "../../src/lib/prisma";
import { emailOTP } from "better-auth/plugins";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: true,

    requireEmailVerification: true,
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }, request) => {
        console.log('Enviando email de verificação:', user);
        sendEmail(user.email, "Verify your email address", `Click the link to verify your email: ${url}`);
      }
    },
    async sendResetPassword(data, request) {
      console.log('Email enviado para redefinição de senha:', data);
      console.log('Requisição:', request);

    },
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
    emailOTP({
      async sendVerificationOTP({
        email,
        otp,
        type
      }) {
        if (type === "sign-in") {
          sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`);
        } else if (type === "email-verification") {
          sendEmail(email, "Your Email Verification Code", `Your email verification code is: ${otp}`);
        } else {
          sendEmail(email, "Your Password Reset Code", `Your password reset code is: ${otp}`);
        }
      },
    }),

    // make sure this is the last plugin in the array
    nextCookies()
  ]

});
