'use client';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Alert, Button } from "@mantine/core";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser()
  console.log('User:', user, 'Is Signed In:', isSignedIn, 'Is Loaded:', isLoaded);
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
    <SignedOut>
      <SignInButton />
      <SignUpButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>


  </>
}
