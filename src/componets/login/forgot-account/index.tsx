import findAccountAction from "@/lib/actions/findAccount";
import { ActionIcon, Box, Button, Card, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconMail, IconSearch } from '@tabler/icons-react';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotAccount() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  const handleSearch = async () => {
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

    const user = await findAccountAction(email);
    setLoading(false);
    if (user) {
      notifications.show({
        title: 'Usuário encontrado',
        message: 'Usuário encontrado, você será redirecionado para a página de recuperação de senha.',
        color: 'green',
      });
      router.push(`/forgot-account/forgot-password/?email=${encodeURIComponent(email)}`);
    }
    else {
      setEmail('');
      notifications.show({
        title: 'Usuário não encontrado',
        message: 'Nenhum usuário encontrado com este email.',
        color: 'red',
      });
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

          <Text size="xl" fw={700} ta="center">Recuperar senha</Text>
        </Box>
        <Text c="dimmed" size="sm" ta="center">
          Informe seus dados para recuperar a senha
        </Text>
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
            leftSection={<IconSearch size={16} />}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Stack>
      </Card.Section>

    </Card>

  </>
}