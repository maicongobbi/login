'use client'

import { useSession } from "@/lib/auth/betterAuthClient/client";
import { Alert } from "@mantine/core";

export default function Home() {

  const { data, isPending } = useSession();
  console.log('Session:', data, isPending);
  const { user, session } = data || {};
  console.log('User:', user);
  console.log('Session:', session);

  return (
    <>
      <Alert>
        dashboard
      </Alert>
    </>
  );
}
