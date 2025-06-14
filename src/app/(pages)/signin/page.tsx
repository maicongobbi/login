import { Button } from "@mantine/core";

export default function SignIn() {
  return (
    <>
      Sign In
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