'use client'

import { signUp } from '@betterAuth/betterAuthClient/client';
import {
  Box,
  Button,
  Card,
  Center,
  FileInput,
  Image,
  Loader,
  PasswordInput,
  rem,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconMail, IconUpload, IconUser, IconUserCircle, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImagem(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagem(null);
      setPreviewImagem(null);
    }
  };

  async function createAccount() {
    setCarregando(true);
    await signUp.email({
      image: imagem ? await converterImagemParaBase64(imagem) : "",
      email,
      password: senha,
      name: `${nome}`,


      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: (data) => {
          console.log('Response received:', data);
          setCarregando(false);
        },

        onRequest: (req) => {
          console.log('Request made:', req);
          setCarregando(true);
        },
        onError: (ctx: { error: { message: string } }) => {
          notifications.show({
            title: 'Erro ao criar conta',
            message: ctx.error.message,
            color: 'red',
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
        },
        onSuccess: async (data) => {
          console.log('Account created successfully:', data);
          router.push("/dashboard")
        },
      },
    });
  }

  return (
    <Card shadow="md" p="lg" radius="md" withBorder className="max-w-md" style={{ borderRadius: '0 0 8px 8px' }}>
      <Card.Section p="md" bg="blue.1">
        <Text size="xl" fw={700} ta="center">Criar Conta</Text>
        <Text c="dimmed" size="sm" ta="center">
          Informe seus dados para criar uma conta
        </Text>
      </Card.Section>

      <Card.Section p="md">
        <Stack>

          <TextInput
            label="Nome"
            placeholder="Ex: João"
            required
            leftSection={<IconUser size={16} />}
            value={nome}
            onChange={(e) => setNome(e.currentTarget.value)}
          />


          <TextInput
            label="Email"
            type="email"
            placeholder="exemplo@email.com"
            required
            leftSection={<IconMail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            required
            leftSection={<IconLock size={16} />}
            value={senha}
            onChange={(e) => setSenha(e.currentTarget.value)}
          />

          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            required
            leftSection={<IconLock size={16} />}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.currentTarget.value)}
          />

          <FileInput
            label="Foto de Perfil (opcional)"
            placeholder="Selecionar imagem"
            accept="image/*"
            leftSection={<IconUpload size={16} />}
            onChange={handleImageChange}
            value={imagem}
            clearable
            clearButtonProps={{ children: <IconX size={14} /> }}
          />

          {previewImagem && (
            <Box mt="sm" style={{ position: 'relative', width: rem(80), height: rem(80) }}>
              <Image
                src={previewImagem}
                alt="Pré-visualização"
                width={80}
                height={80}
                radius="sm"
              />
              <Button
                variant="light"
                color="red"
                size="xs"
                p={2}
                style={{
                  position: 'absolute',
                  top: rem(-8),
                  right: rem(-8),
                  borderRadius: '50%'
                }}
                onClick={() => handleImageChange(null)}
              >
                <IconX size={14} />
              </Button>
            </Box>
          )}

          <Button
            fullWidth
            mt="md"
            leftSection={carregando ? <Loader size="xs" /> : <IconUserCircle size={18} />}
            disabled={carregando}
            onClick={async () => {
              await createAccount();
            }}
          >
            {carregando ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </Stack>
      </Card.Section>

      <Card.Section p="md" bg="gray.0">
        <Center>
          <Text size="sm" c="dimmed">
            Segurança garantida por{' '}
            <Text span c="orange" inherit>better-auth</Text>
          </Text>
        </Center>
      </Card.Section>
    </Card>
  );
}

async function converterImagemParaBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}