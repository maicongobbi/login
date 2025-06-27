import { resetPassword } from "@/lib/auth/betterAuthClient/client";
import { ActionIcon, Alert, Box, Button, Card, PasswordInput, Stack, Text, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconExchange, IconLock } from '@tabler/icons-react';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const param = useSearchParams();

  const token = param.get('token');
  const router = useRouter()


  const alterarSenha = async () => {
    setLoading(true);
    //validar se o token é válido
    if (!token) {
      notifications.show({
        title: 'Token inválido',
        message: 'Por favor, informe um token válido.',
        color: 'red',
      });
      setLoading(false);
      return;
    }
    //validar se a senha é válida
    if (!password || password.length < 6) {
      notifications.show({
        title: 'Senha inválida',
        message: 'Por favor, informe uma senha válida com pelo menos 6 caracteres.',
        color: 'red',
      });
      setLoading(false);
      return;
    }
    if (!confirmPassword || confirmPassword !== password) {
      notifications.show({
        title: 'Confirmação de senha inválida',
        message: 'Por favor, confirme a senha corretamente.',
        color: 'red',
      });
      setLoading(false);
      return;
    }
    const { error } = await resetPassword({
      token: token,
      newPassword: password,
    });
    if (error) {
      notifications.show({
        title: 'Erro ao redefinir senha',
        message: 'Ocorreu um erro ao tentar redefinir sua senha. Por favor, tente novamente.',
        color: 'red',
        autoClose: 15000,
      });
    }
    else {
      notifications.show({
        title: 'Senha redefinida com sucesso',
        message: 'Sua senha foi redefinida com sucesso. Você pode fazer login agora.',
        color: 'green',
        autoClose: 15000,
      });
      router.push('/sign-in');
    }
    setLoading(false);
  }

  return <>
    <Card shadow="md" p="lg" radius="md" withBorder className="max-w-md" style={{ borderRadius: '0 0 8px 8px' }}>

      <Card.Section p="md" bg="blue.1">
        <Box pos="relative" mih={40}>
          <Tooltip label="Voltar para a página de boas-vindas" position="left" withArrow>

            <ActionIcon
              component="a"
              href="/welcome"
              title="Voltar"
              variant="transparent"
              size="lg"
              color="red"
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <IconArrowLeft size={16} />
            </ActionIcon>
          </Tooltip>

          <Text size="xl" fw={700} ta="center">Reset de senha</Text>
        </Box>

      </Card.Section>
      {!token &&
        <Card.Section p="md">
          <Alert color={'red'}>
            <Text size="sm" ta="center">
              O token de redefinição inválido, gere nova recuperação de senha.
            </Text>
          </Alert>
        </Card.Section>
      }
      <Card.Section p="md">
        <Stack>

          <PasswordInput
            label="Nova senha"
            placeholder="Nova senha"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            error={password && password.length < 6 ? "A senha deve ter pelo menos 6 caracteres" : null}
            leftSection={<IconLock size={16} />}
          />

          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            error={confirmPassword && confirmPassword !== password ? "As senhas não coincidem" : null}
            leftSection={<IconLock size={16} />}
          />

          <Button
            loading={loading}
            disabled={loading}
            leftSection={<IconExchange size={16} />}
            onClick={alterarSenha}
          >
            Alterar
          </Button>
        </Stack>
      </Card.Section>

    </Card>

  </>
}