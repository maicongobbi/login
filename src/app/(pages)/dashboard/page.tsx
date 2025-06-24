
import { useUser } from "@clerk/nextjs";
import { Alert } from "@mantine/core";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log('User:', user, 'Is Signed In:', isSignedIn, 'Is Loaded:', isLoaded);


  return (
    <>
      <Alert>
        dashboard
      </Alert>
    </>
  );
}
