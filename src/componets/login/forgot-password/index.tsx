'use client';
import { forgetPassword } from "@/lib/auth/betterAuthClient/client";
import { ActionIcon, Box, Button, Card, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconMail, IconSend } from '@tabler/icons-react';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const param = useSearchParams();
  const emailParam = param.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const alterarSenha = async () => {
    setLoading(true);
    //validar se o email é válido
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notifications.show({
        title: 'Email inválido',
        message: 'Por favor, informe um email válido.',
        color: 'red',
      });
      setLoading(false);
      return;
    }

    const { error } = await forgetPassword({
      email: email,
      redirectTo: `${window.location.origin}/forgot-account/forgot-password/reset-password`
    })
    if (error) {
      setLoading(false);
      notifications.show({
        title: 'Erro ao enviar email',
        message: 'Ocorreu um erro ao tentar enviar o email de recuperação. Por favor, tente novamente.',
        color: 'red',
      });
      return;
    }
    else {
      setLoading(false);
      notifications.show({
        title: 'Email enviado',
        message: 'Um email de recuperação foi enviado para o seu endereço. Por favor, verifique sua caixa de entrada.',
        color: 'green',
      });
      //  router.push('/welcome');
    }



  };



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

          <Text size="xl" fw={700} ta="center">Esqueci minha senha</Text>
        </Box>

      </Card.Section>
      <Card.Section p="md">
        <Stack>

          <TextInput
            label="Email"
            type="email"
            placeholder="Ex: joao@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            leftSection={<IconMail size={16} />}
          />
          <Button
            loading={loading}
            disabled={!email || loading}
            leftSection={<IconSend size={16} />}
            onClick={alterarSenha}
          >
            Enviar email de recuperação
          </Button>
        </Stack>
      </Card.Section>

    </Card>

  </>
}