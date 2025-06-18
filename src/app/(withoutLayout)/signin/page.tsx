'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
  useMantineTheme
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAt, IconBrandFacebook, IconBrandGoogle, IconBrandInstagram, IconBrandX, IconLock } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

// Schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
});

// Tipo inferido do schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function SignIn() {
  const router = useRouter();
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);

    try {
      // Chamada ao NextAuth para autenticação
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (result?.error) {
        // Tratar erros específicos
        if (result.error === 'CredentialsSignin') {
          setError('password', {
            type: 'manual',
            message: 'Credenciais inválidas'
          });
        } else {
          notifications.show({
            title: 'Erro no login',
            message: result.error,
            color: 'red',
          });
        }
        return;
      }

      // Login bem-sucedido
      notifications.show({
        title: 'Login realizado!',
        message: `Bem-vindo de volta, ${data.email}`,
        color: 'green',
      });

      // Redirecionar para a página inicial
      router.push('/');
    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Ocorreu um erro inesperado',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/' }); // Redirecionar para home após login
  };

  return (
    <Container size={460} my={40} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box style={{ width: '100%' }}>
        <Title ta="center" mb="xl" style={{ fontSize: rem(32), fontWeight: 800 }}>
          Bem-vindo de volta!
        </Title>


        <Paper withBorder shadow="md" p={30} radius="md" style={{
          /* @ts-ignore */
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="seu@email.com"
                required
                leftSection={<IconAt size={16} />}
                error={errors.email?.message}
                {...register('email')}
                disabled={isLoading}
              />

              <PasswordInput
                label="Senha"
                placeholder="Sua senha"
                required
                leftSection={<IconLock size={16} />}
                error={errors.password?.message}
                {...register('password')}
                disabled={isLoading}
              />

              <Group justify="space-between" mt="lg">
                <Anchor component={Link} href="/forgot-password" size="sm">
                  Esqueceu a senha?
                </Anchor>
              </Group>

              <Button
                fullWidth
                mt="xl"
                type="submit"
                size="md"
                disabled={isLoading}
                leftSection={isLoading && <Loader size="sm" />}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </Stack>
          </form>

          <Divider label="Ou continue com" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <Button
              leftSection={<IconBrandGoogle size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('google')}
              color={theme.colors.red[6]}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              leftSection={<IconBrandFacebook size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('facebook')}
              color={theme.colors.blue[6]}
              disabled={isLoading}
            >
              Facebook
            </Button>
          </Group>

          <Group grow mb="md">
            <Button
              leftSection={<IconBrandInstagram size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('instagram')}
              color={theme.colors.pink[6]}
              disabled={isLoading}
            >
              Instagram
            </Button>
            <Button
              leftSection={<IconBrandX size={18} />}
              variant="outline"
              radius="xl"
              onClick={() => handleSocialLogin('twitter')}
              color={theme.colors.dark[6]}
              disabled={isLoading}
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