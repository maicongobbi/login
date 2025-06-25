'use client';
import {
  Anchor,
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Overlay,
  rem,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { IconArrowRight, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandWhatsapp, IconChartBar, IconMail, IconRocket, IconShieldLock } from '@tabler/icons-react';

import { authClient } from "@betterAuth/client";
import Link from 'next/link';
import { useSession } from '../../../lib/auth/betterAuthClient/client';

export default function WelcomePage() {
  const theme = useMantineTheme();
  const session = useSession();
  console.log('Session:', session);

  const session2 = authClient.useSession();
  console.log('Session2:', session2);

  // Dados para a galeria de imagens
  const features = [
    {
      title: 'Segurança Avançada',
      description: 'Proteção de dados com criptografia e armazenamento em nuvem',
      icon: <IconShieldLock size={32} />,
      color: 'blue'
    },
    {
      title: 'Implementação Rápida',
      description: 'Soluções personalizadas para o seu negócio.',
      icon: <IconRocket size={32} />,
      color: 'teal'
    },
    {
      title: 'Experiência Premium',
      description: 'Extração de dados, painéis gerenciais intuitivos e relatórios detalhados',
      icon: <IconChartBar size={32} />,
      color: 'violet'
    }
  ];

  // Imagens para a galeria
  /*  const galleryImages = [
     'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
   ]; */

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      zIndex: 0

    }}>
      <Overlay gradient={`linear-gradient(180deg, rgba(0, 0, 0, 0.226) 0%, rgba(0, 0, 0, 0.048) 100%)`}
        style={{ zIndex: 1 }}
      />
      {/* Header */}
      <Group justify="space-between" p="md" style={{ backgroundColor: theme.colors.dark[8] }}>
        <Group>
          <Avatar color="blue" radius="xl">GTI</Avatar>
          <Title order={3} c="white">
            Gobbi TI
          </Title>
        </Group>
        <Group style={{
          zIndex: 2
        }}>
          <Button component={Link} href="/sign-in" variant="light" size="sm">
            Entrar
          </Button>
          <Button component={Link} href="/sign-up" variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }} size="sm">
            Criar Conta
          </Button>
        </Group>
      </Group>

      {/* Hero Section */}
      <BackgroundImage
        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"

        style={{
          height: '85vh'


        }}
      >

        <Center style={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center', maxWidth: rem(800),
            zIndex: -1
          }}>
            <Title
              order={1}
              size={rem(48)}
              fw={800}
              c="white"
              mb="xl"
              style={{
                lineHeight: 1.2,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',

              }}

            >
              Bem-vindo à Gobbi TI
            </Title>
            <Text
              size="xl"
              c="white"
              mb="xl"
              style={{
                maxWidth: rem(600), margin: '0 auto',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Webb Apps personalizados para o seu negócio.
            </Text>
            <Group justify="center">
              <Button
                component={Link}
                href="https://api.whatsapp.com/send?phone=5567992326947"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                size="lg"
                radius="xl"
                rightSection={<IconArrowRight size={18} />}
              >
                Entrar em contato
              </Button>
              <Button
                variant="outline"
                color="white"
                size="lg"
                radius="xl"
              >
                Saiba Mais
              </Button>
            </Group>
          </div>
        </Center>
      </BackgroundImage>

      {/* Features Section */}
      <Container py={80} size="xl">
        <Title order={2} ta="center" mb={50} style={{ fontSize: rem(36) }}>
          Por que escolher a Gobbi TI?
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              shadow="md"
              padding="xl"
              radius="lg"
              style={{

                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: `1px solid ${theme.colors[feature.color][6]}`,
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows.xl
                }
              }}
            >
              <Center mb="md">
                <Avatar color={feature.color} size="xl" radius="xl">
                  {feature.icon}
                </Avatar>
              </Center>
              <Title order={3} ta="center" mb="sm" c={theme.colors[feature.color][6]}>
                {feature.title}
              </Title>
              <Text ta="center" c="dimmed">{feature.description}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Gallery Section */}
      {/*   <Box py={80} >
        <Container size="xl">
          <Title order={2} ta="center" mb={50} style={{ fontSize: rem(36) }}>
            Nossa Plataforma em Ação
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {galleryImages.map((img, index) => (
              <Box key={index} style={{ borderRadius: theme.radius.md, overflow: 'hidden', height: rem(250) }}>
                <Image
                  src={img}
                  alt={`Exemplo ${index + 1}`}
                  height={250}
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  styles={{
                    root: {
                      ':hover': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>

          <Center mt="xl">
            <Text size="lg" ta="center" style={{ maxWidth: rem(800) }}>
              Veja como nossa solução de autenticação pode transformar a experiência dos seus usuários e aumentar a segurança da sua aplicação
            </Text>
          </Center>
        </Container>
      </Box> */}

      {/* Testimonials */}
      {/*
      <Container py={80} size="xl">
        <Title order={2} ta="center" mb={50} style={{ fontSize: rem(36) }}>
          O que nossos clientes dizem
        </Title>

           <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {[
            {
              name: 'Carlos Silva',
              role: 'CTO na TechSolutions',
              comment: 'Implementamos a Login APP em todos os nossos produtos e reduzimos problemas de autenticação em 85%.'
            },
            {
              name: 'Mariana Oliveira',
              role: 'Product Manager na InovaCorp',
              comment: 'A experiência do usuário melhorou significativamente após migrarmos para a Login APP. Recomendo!'
            },
            {
              name: 'Roberto Mendes',
              role: 'Diretor de Segurança na GlobalBank',
              comment: 'A solução de autenticação mais completa e segura que já utilizamos. Atendeu todas nossas exigências.'
            }
          ].map((testimonial, index) => (
            <Card key={index} padding="xl" shadow="sm" radius="lg" withBorder>
              <Text mb="lg" fs="italic" c="dimmed">"{testimonial.comment}"</Text>
              <Group>
                <Avatar size="md" color="blue" radius="xl">{testimonial.name.split(' ').map(n => n[0]).join('')}</Avatar>
                <div>
                  <Text fw={500}>{testimonial.name}</Text>
                  <Text size="sm" c="dimmed">{testimonial.role}</Text>
                </div>
              </Group>
            </Card>
          ))}
        </SimpleGrid> 
      </Container>
        */}

      {/* Call to Action */}
      <Box py={80} style={{ backgroundColor: theme.colors.dark[8] }}>
        <Container size="md">
          <Title order={2} ta="center" mb="md" c="white">
            Pronto para começar?
          </Title>
          <Text size="xl" ta="center" mb="xl" c="dimmed" style={{ maxWidth: rem(700), margin: '0 auto' }}>
            Entre em contato conosco e descubra como a Gobbi TI pode transformar a gerencia do seu negócio.
          </Text>
          <Center>
            <Button
              component={Link}
              href="https://api.whatsapp.com/send?phone=5567992326947"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              size="xl"
              radius="xl"
              rightSection={<IconArrowRight size={20} />}
            >
              Entrar em contato
            </Button>
          </Center>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={50} style={{ backgroundColor: theme.colors.dark[9] }}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={40}>
            <div>
              <Group mb="md">
                <Avatar color="blue" radius="xl">GTI</Avatar>
                <Title order={3} c="white">
                  Gobbi TI
                </Title>
              </Group>
              <Text c="dimmed" mb="sm">
                Sua solução completa para gerenciamento do seu negócio.
              </Text>
              <Group mt="md">
                {[IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin].map((Icon, index) => (
                  <Button key={index} variant="outline" color="gray" size="sm" radius="xl">
                    <Icon size={18} />
                  </Button>
                ))}
              </Group>
            </div>

            <div>
              <Title order={4} mb="md" c="white">
                Links Rápidos
              </Title>
              <Stack gap="sm">
                {['Sobre Nós', 'Recursos', 'Preços', 'Documentação', 'Blog'].map((link, index) => (
                  <Anchor key={index} href="#" c="dimmed" size="sm">
                    {link}
                  </Anchor>
                ))}
              </Stack>
            </div>

            <div>
              <Title order={4} mb="md" c="white">
                Contato
              </Title>
              <Stack gap="sm">
                {/*  <Group c="dimmed">
                  <IconMapPin size={18} />
                  <Text>Av. Paulista, 1000 - São Paulo, SP</Text>
                </Group> */}
                <Group c="dimmed">
                  <IconBrandWhatsapp size={18} />
                  <Button
                    component="a" href="https://api.whatsapp.com/send?phone=5567992326947" target="_blank"
                    variant="subtle" color="dimmed"
                    p={0}
                    m={0}                  >
                    (67) 9 9232-6947
                  </Button>

                </Group>

                <Group c="dimmed">
                  <IconMail size={18} />
                  <Text>maicongobbi@gmail.com</Text>
                </Group>
              </Stack>
            </div>
          </SimpleGrid>

          <Divider my="xl" color={theme.colors.dark[6]} />

          <Group justify="space-between" c="dimmed">
            <Text size="sm">© 2025 GobbiTI. Todos os direitos reservados.</Text>
            <Group>
              <Anchor href="#" size="sm" c="dimmed">
                Termos de Uso
              </Anchor>
              <Anchor href="#" size="sm" c="dimmed">
                Política de Privacidade
              </Anchor>
              <Anchor href="#" size="sm" c="dimmed">
                Cookies
              </Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
    </div >
  );
}