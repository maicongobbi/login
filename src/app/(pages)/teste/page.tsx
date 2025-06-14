import { Button } from "@mantine/core";

export default function Teste() {
  return (
    <>
      Teste
      <Button
        component="a"
        href="/"
        variant="outline"
        color="blue"
        size="md"
        style={{ marginTop: 20 }}
      >
        Go to
        {' '}
        home
      </Button>
    </>
  );
}