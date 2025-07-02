import { createAuthClient } from "better-auth/react";

/**
 * usado para sign in, sign up, sign out, get session, etc.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,



})
export type Session = typeof authClient.$Infer.Session
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword

} = authClient;