'use client'
import { signIn } from '@betterAuth/betterAuthClient/client';
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


export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    await signIn.email(
      { email, password },

      {
        onRequest: (data) => {
          console.log('Signing in with email:', data);
          setLoading(true)
        },
        onResponse: (resp) => {
          console.log('Sign in response received', resp);
          if (resp.response.statusText === 'UNAUTHORIZED') {
            notifications.show({
              title: 'Erro ao fazer login',
              message: 'Email ou senha inválidos. Por favor, tente novamente.',
              color: 'red',
            });
          }
          setLoading(false)
        },
        onSuccess: (data) => {
          console.log('Sign in successful:', data);
          notifications.show({
            title: 'Login bem-sucedido',
            message: 'Você foi autenticado com sucesso.',
            color: 'green',
          });
          // Redirect to dashboard or home page
          window.location.href = '/dashboard';
        }
      }
    );
  }

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder className="max-w-md">
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
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <PasswordInput
            label="Senha"
            placeholder="senha"
            autoComplete="password"
            required
            leftSection={<IconLock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Link href="#" style={{ fontSize: '0.8rem' }}>
            Esqueceu sua senha?
          </Link>

          <Checkbox
            label="Lembrar de mim"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />

          <Button
            fullWidth
            disabled={loading}
            leftSection={loading ? <Loader size="xs" /> : <IconKey size={16} />}
            onClick={async () => {
              await signInWithEmail();
            }}
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
                {
                  onRequest: () => setLoading(true),
                  onResponse: () => setLoading(false),
                }
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
                {
                  onRequest: () => setLoading(true),
                  onResponse: () => setLoading(false),
                }
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
                {
                  onRequest: () => setLoading(true),
                  onResponse: () => setLoading(false),
                }
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
    </Card>
  );
}