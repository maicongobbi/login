"use server"

import { FormValueSignUp } from "@/componets/login/sign/up";
import { signUp } from "../auth/betterAuthClient/client";

export async function signUpAction(formData: FormValueSignUp, image: string): Promise<{ message: string, status: number }> {
  const { email, senha, nome } = formData;
  let message: string = '';
  let status: number = 200;

  try {

    await signUp.email({
      image: image,
      email,
      password: senha,
      name: nome,
      callbackURL: "/sign-in",


    }, {


      onError: (ctx: { error: { message: string } }) => {
        console.error('\n\nErro ao criar conta:', ctx?.error?.message);

        if (ctx?.error?.message?.includes('User already exists')) {
          message = 'Usuário já existe. Caso tenha esquecido, recupere a senha.';
          status = 401;
        } else {
          message = 'Ocorreu um erro durante o login. Tente novamente.';
          status = 500;
        }
      },
      onSuccess: () => {
        message = 'Login realizado com sucesso!';
        status = 200;

      }
    });

    return { message, status };
  } catch (error) {
    console.error('Erro no login:', error);
    return { message: 'Ocorreu um problema durante o login. Tente novamente.', status: 500 };
  }
}



