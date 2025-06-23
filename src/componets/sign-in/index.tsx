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
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle, IconKey, IconLock, IconMail } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';


export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder className="max-w-md">
      <Card.Section p="md">
        <Text size="xl" fw={700} ta="center">Sign In</Text>
        <Text c="dimmed" size="sm" ta="center">
          Enter your email below to login to your account
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
            placeholder="password"
            autoComplete="password"
            required
            leftSection={<IconLock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Link href="#" style={{ fontSize: '0.8rem' }}>
            Forgot your password?
          </Link>

          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />

          <Button
            fullWidth
            disabled={loading}
            leftSection={loading ? <Loader size="xs" /> : <IconKey size={16} />}
            onClick={async () => {
              await signIn.email(
                { email, password },
                {
                  onRequest: () => setLoading(true),
                  onResponse: () => setLoading(false),
                }
              );
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Divider label="Or continue with" labelPosition="center" my="sm" />

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
            Sign in with Google
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
            Sign in with Facebook
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
            Sign in with Apple
          </Button>
        </Stack>
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