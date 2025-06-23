import { createAuthClient } from "better-auth/react";

/**
 * usado para sign in, sign up, sign out, get session, etc.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,

})

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;