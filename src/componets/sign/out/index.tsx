import { signOut } from "@/lib/auth/betterAuthClient/client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";


export default function SignOut() {
  const router = useRouter();

  const handleClick = async () => {
    await signOut(
      {
        fetchOptions: {
          onSuccess: () => {
            console.log('Logout successful');
            router.push('/welcome');
            notifications.show({
              title: 'Logout',
              message: 'Você foi desconectado com sucesso.',
              color: 'green',
            });

          },
          onError: (error) => {
            console.error('Logout error:', error);
            notifications.show({
              title: 'Erro ao desconectar',
              message: 'Ocorreu um erro ao tentar desconectar. Por favor, tente novamente.',
              color: 'red',
            });
          }
        }
      }
    );
  }

  return <>
    <Button onClick={handleClick}>
      Sair
    </Button>
  </>
}