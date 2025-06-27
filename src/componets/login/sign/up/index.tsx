'use client'
import { signUpAction } from '@/lib/actions/signUp';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionIcon,
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
  TextInput,
  Tooltip
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconLock, IconMail, IconUpload, IconUser, IconUserCircle, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Schema de validação com Zod
const schema = z.object({
  nome: z.string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(50, { message: "Nome muito longo" }),
  email: z.string()
    .email({ message: "Email inválido" })
    .min(5, { message: "Email muito curto" }),
  senha: z.string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(50, { message: "Senha muito longa" }),
  confirmarSenha: z.string(),
  imagem: z.instanceof(File).nullable().optional()
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"]
});

export type FormValueSignUp = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValueSignUp>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      imagem: null
    }
  });

  const imagem = watch("imagem");

  const handleImageChange = (file: File | null) => {
    setValue("imagem", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImagem(null);
    }
  };


  const onSubmit = async (data: FormValueSignUp) => {
    setCarregando(true);
    try {
      let imagemBase64 = null;

      // Converter imagem no cliente antes de enviar
      if (data.imagem) {
        imagemBase64 = await converterImagemParaBase64(data.imagem);
      }

      const resp = await signUpAction({ ...data }, imagemBase64 ?? '');

      if (resp.status === 200) {
        notifications.show({
          title: 'Conta criada com sucesso',
          message: resp.message,
          color: 'green',
        });
        return router.push('/dashboard');

      } else {
        notifications.show({
          title: 'Erro ao criar conta',
          message: resp.message,
          color: 'red',
          autoClose: 10000,
        });
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      notifications.show({
        title: 'Erro ao criar conta',
        message: 'Ocorreu um problema. Por favor, tente novamente.',
        color: 'red',
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Card shadow="md" p="lg" radius="md" withBorder className="max-w-md" style={{ borderRadius: '0 0 8px 8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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

            <Text size="xl" fw={700} ta="center">Criar Conta</Text>
          </Box>
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
              error={errors.nome?.message}
              {...register('nome')}
            />

            <TextInput
              label="Email"
              type="email"
              placeholder="exemplo@email.com"
              required
              leftSection={<IconMail size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              required
              leftSection={<IconLock size={16} />}
              error={errors.senha?.message}
              {...register('senha')}
            />

            <PasswordInput
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              required
              leftSection={<IconLock size={16} />}
              error={errors.confirmarSenha?.message}
              {...register('confirmarSenha')}
            />

            <FileInput
              label="Foto de Perfil (opcional)"
              placeholder="Selecionar imagem"
              accept="image/*"
              leftSection={<IconUpload size={16} />}
              onChange={handleImageChange}
              value={imagem}
              clearable
              error={errors.imagem?.message}
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
              type="submit"
              fullWidth
              mt="md"
              leftSection={carregando ? <Loader size="xs" /> : <IconUserCircle size={18} />}
              disabled={carregando}
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
      </form>
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