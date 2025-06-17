import { Button, Container, Group, Text, Title, rem } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container
      py="xl"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}
    >
      <div style={{ position: 'relative', marginBottom: rem(40) }}>
        <Text
          style={{
            fontSize: rem(220),
            fontWeight: 900,
            lineHeight: 1,
            color: '#e9ecef',
            textShadow: '3px 3px 0 #ced4da',
            zIndex: 0,
          }}
        >
          404
        </Text>

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <Title
            order={1}
            style={{
              fontSize: rem(38),
              fontWeight: 800,
              color: '#2b2c3d',
            }}
          >
            Página não encontrada
          </Title>
        </div>
      </div>

      <Text
        size="lg"
        style={{
          maxWidth: rem(600),
          marginBottom: rem(40),
          color: '#495057',
          lineHeight: 1.6,
        }}
      >
        Ops! Parece que você se perdeu no caminho. A página que você está procurando pode ter sido movida,
        removida ou talvez nunca tenha existido. Vamos te ajudar a voltar aos trilhos.
      </Text>

      <Group justify="center">
        <Button
          component={Link}
          href="/"
          size="md"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          leftSection={<IconHome size={20} />}
        >
          Voltar para a página inicial
        </Button>
      </Group>

      <div style={{ marginTop: rem(60), color: '#adb5bd', fontSize: rem(14) }}>
        <Text>Está perdido? Tente:</Text>
        <Group justify="center" mt="xs">
          <Button variant="subtle" size="xs" component={Link} href="/sobre">
            Sobre nós
          </Button>
          <Button variant="subtle" size="xs" component={Link} href="/contato">
            Contato
          </Button>
          <Button variant="subtle" size="xs" component={Link} href="/blog">
            Blog
          </Button>
        </Group>
      </div>
    </Container>
  );
}