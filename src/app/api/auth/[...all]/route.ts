
import { auth } from "@/lib/utils/auth";
import { toNextJsHandler } from "better-auth/next-js";


export const { GET, POST } = toNextJsHandler(auth.handler);