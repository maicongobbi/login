'use server'
import { signIn } from "../auth/betterAuthClient/client";


export default async function signInAction({ email, password }: { email: string, password: string }): Promise<{ message: string, status: number }> {

  try {

    let message: string = '';
    let status: number = 200;

    await signIn.email(
      { email, password, callbackURL: '/dashboard' },

      {
        onError: (ctx: { error: { message: string } }) => {
          console.error('\n\nErro ao fazer login:', ctx?.error?.message);
          if (ctx?.error?.message?.includes('Invalid email')) {
            message = 'Credenciais inválidas. Verifique seu email e senha.';
            status = 401;
          } else {
            message = 'Ocorreu um erro durante o login. Tente novamente.';
            status = 500;
          }
        },
        onSuccess: (data) => {
          console.log('Login successful:', data);
          message = 'Login realizado com sucesso!';
          status = 200;

        }
      }
    );

    return { message, status };
  } catch (error) {
    console.error('Erro no login:', error);
    return { message: 'Ocorreu um problema durante o login. Tente novamente.', status: 500 };
  }
}