'use client'
import { signIn } from '@/lib/auth/betterAuthClient/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Center,
  Checkbox,
  Divider,
  Loader,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle, IconKey, IconLock, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Schema de validação com Zod
const schema = z.object({
  email: z.string()
    .email({ message: "Email inválido" })
    .min(5, { message: "Email muito curto" }),
  password: z.string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(50, { message: "Senha muito longa" }),
  rememberMe: z.boolean().optional()
});

type FormValues = z.infer<typeof schema>;

export default function SignInComponent() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await signIn.email(
        { email: data.email, password: data.password },
        {
          onRequest: () => console.log('Signing in with email:', data.email),
          onResponse: (resp) => {
            if (resp.response.statusText === 'UNAUTHORIZED') {
              notifications.show({
                title: 'Erro ao fazer login',
                message: 'Credenciais inválidas. Verifique seu email e senha.',
                color: 'red',
              });
            }
          },
          onSuccess: () => {
            notifications.show({
              title: 'Login bem-sucedido',
              message: 'Você foi autenticado com sucesso.',
              color: 'green',
            });
            window.location.href = '/dashboard';
          }
        }
      );
    } catch (error) {
      console.error('Erro no login:', error);
      notifications.show({
        title: 'Erro inesperado',
        message: 'Ocorreu um problema durante o login. Tente novamente.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder className="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Section p="md">
          <Text size="xl" fw={700} ta="center">Entrar</Text>
          <Text c="dimmed" size="sm" ta="center">
            Insira seu email abaixo para fazer login na sua conta
          </Text>
        </Card.Section>

        <Card.Section p="md">
          <Stack>
            <TextInput
              label="Email"
              placeholder="m@example.com"
              required
              leftSection={<IconMail size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <PasswordInput
              label="Senha"
              placeholder="senha"
              autoComplete="current-password"
              required
              leftSection={<IconLock size={16} />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Link href="#" style={{ fontSize: '0.8rem' }}>
              Esqueceu sua senha?
            </Link>

            <Checkbox
              label="Lembrar de mim"
              {...register('rememberMe')}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              leftSection={loading ? <Loader size="xs" /> : <IconKey size={16} />}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <Divider label="Ou continue com" labelPosition="center" my="sm" />

            <Button
              variant="outline"
              fullWidth
              leftSection={<IconBrandGoogle size={20} color="#4285F4" />}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  { provider: "google", callbackURL: "/dashboard" },
                  { onRequest: () => setLoading(true) }
                );
              }}
            >
              Entrar com Google
            </Button>

            <Button
              variant="outline"
              fullWidth
              leftSection={<IconBrandFacebook size={20} color="#4267B2" />}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  { provider: "facebook", callbackURL: "/dashboard" },
                  { onRequest: () => setLoading(true) }
                );
              }}
            >
              Entrar com Facebook
            </Button>

            <Button
              variant="outline"
              fullWidth
              leftSection={<IconBrandApple size={20} />}
              disabled={loading}
              onClick={async () => {
                await signIn.social(
                  { provider: "apple", callbackURL: "/dashboard" },
                  { onRequest: () => setLoading(true) }
                );
              }}
            >
              Entrar com Apple
            </Button>
          </Stack>
          <Divider label="Novo por aqui" labelPosition="center" my="sm" />
          <Button
            component='a'
            href="/sign-up"
            variant="outline"
            fullWidth
            leftSection={<IconKey size={16} />}
            disabled={loading}
          >
            Criar conta
          </Button>
        </Card.Section>

        <Card.Section p="md">
          <Center>
            <Text size="sm" c="dimmed">
              Built with{' '}
              <Link
                href="https://better-auth.com"
                target="_blank"
                style={{ textDecoration: 'underline' }}
              >
                <Text span c="blue" inherit>better-auth</Text>
              </Link>
            </Text>
          </Center>
        </Card.Section>
      </form>
    </Card>
  );
}