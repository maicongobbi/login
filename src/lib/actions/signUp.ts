"use server"

import { FormValueSignUp } from "@/componets/sign/up";
import { APIError } from "better-auth/api";
import { signUp } from "../auth/betterAuthClient/client";

export async function signUpAction(formData: FormValueSignUp, image: string): Promise<{ message?: string }> {
  const { email, senha, nome } = formData;

  try {

    await signUp.email({
      image: image,
      email,
      password: senha,
      name: nome,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: (data) => {
          console.log('Response received:', data);
        },
        onRequest: (req) => {
          console.log('Request made:', req);
        },
        onError: (ctx: { error: { message: string } }) => {
          console.error('Error during sign up:', ctx.error.message);

          throw new APIError("BAD_REQUEST", {
            message: ctx.error.message || "Erro ao criar conta, por favor tente novamente.",
          });
        },
        onSuccess: async (data) => {
          console.log('Account created successfully:', data);
        },
      },

    });
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          console.error("Unprocessed entity error:", error);
          return { message: "Usuário já cadastrado" }
        case "BAD_REQUEST":
          if (error.message.includes("already exists")) {
            return { message: "Usuário já existe, faça login na conta" }
          }
          return { message: "Dados inválidos, " + error.message || "por favor verifique os dados e tente novamente." }
        case "UNAUTHORIZED":
          console.error("Unauthorized error:", error);
          return { message: "Você não está autorizado a realizar esta ação." }
        default:
          console.error("Unexpected error:", error);
          return { message: "Erro inesperado, por favor tente novamente mais tarde." }
      }
    }
  }

  return { message: "Usuário criado com sucesso" };
}



