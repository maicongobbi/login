'use client'

import { useSession } from "@/lib/auth/betterAuthClient/client";
import { Alert } from "@mantine/core";

export default function Home() {
  console.log('Dashboard page loaded');
  const { data, isPending } = useSession();
  console.log('Session:', data, isPending);
  const { user, session } = data || {};
  console.log('User:', user);
  console.log('Session:', session);


  return (
    <>
      {!session && <>Não autenticado</>}
      <Alert>

        dashboard
      </Alert>
    </>
  );
}
