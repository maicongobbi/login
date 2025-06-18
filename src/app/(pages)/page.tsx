import { Alert, Button } from "@mantine/core";

export default function Home() {
  return <>
    Home
    <Alert>
      matine
    </Alert>
    <Button
      component="a"
      href="/teste"
      variant="outline"
      color="blue"
      size="md"
      style={{ marginTop: 20 }}
    >
      página inicial - ir para teste
    </Button>


  </>
}
