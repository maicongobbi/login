'use client'
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
  useMantineTheme
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconBrandFacebook, IconBrandGoogle, IconBrandInstagram, IconBrandX, IconLock } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      password: (value) => (value.length < 6 ? 'Senha deve ter pelo menos 6 caracteres' : null),
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    notifications.show({
      title: 'Login realizado!',
      message: `Bem-vindo de volta, ${values.email}`,
      color: 'green',
    });

    // Redireciona para a página inicial após login
    router.push('/');
  };

  const handleSocialLogin = (provider: string) => {
    notifications.show({
      title: 'Login com rede social',
      message: `Redirecionando para ${provider}`,
      color: 'blue',
    });
  };

  return (
    <Container size={460} my={40} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box style={{ width: '100%' }}>
        <Title ta="center" mb="xl" style={{ fontSize: rem(32), fontWeight: 800 }}>
          Bem-vindo de volta!
        </Title>

        <Paper withBorder shadow="md" p={30} radius="md" >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="seu@email.com"
                required
                leftSection={<IconAt size={16} />}
                {...form.getInputProps('email')}
              />

              <PasswordInput
                label="Senha"
                placeholder="Sua senha"
                required
                leftSection={<IconLock size={16} />}
                {...form.getInputProps('password')}
              />

              <Group justify="space-between" mt="lg">
                <Anchor component={Link} href="/forgot-password" size="sm">
                  Esqueceu a senha?
                </Anchor>
              </Group>

              <Button fullWidth mt="xl" type="submit" size="md">
                Entrar
              </Button>
            </Stack>
          </form>

          <Divider label="Ou continue com" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <Button
              leftSection={<IconBrandGoogle size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('Google')}
              color={theme.colors.red[6]}
            >
              Google
            </Button>
            <Button
              leftSection={<IconBrandFacebook size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('Facebook')}
              color={theme.colors.blue[6]}
            >
              Facebook
            </Button>
          </Group>

          <Group grow mb="md">
            <Button
              leftSection={<IconBrandInstagram size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('Instagram')}
              color={theme.colors.pink[6]}
            >
              Instagram
            </Button>
            <Button
              leftSection={<IconBrandX size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('X')}
              color={theme.colors.dark[6]}
            >
              X
            </Button>
          </Group>

          <Center mt="xl">
            <Text c="dimmed" size="sm">
              Não tem uma conta?{' '}
              <Anchor component={Link} href="/signup" size="sm">
                Criar conta
              </Anchor>
            </Text>
          </Center>
        </Paper>
      </Box>
    </Container>
  );
}