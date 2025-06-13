"use client";

import { Center, Loader, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { DatesProvider } from "@mantine/dates";
import '@mantine/dates/styles.css';
import { ModalsProvider } from "@mantine/modals";
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import { Suspense, type ReactNode } from "react";
dayjs.locale('pt-br');

const queryClient = new QueryClient();

/* import 'mantine-react-table/styles.css'; */
export default function Providers({ children }: { children: ReactNode }) {

  return (
    <MantineProvider >
      <DatesProvider settings={{ locale: 'pt-BR' }}>
        <ModalsProvider>
          <Notifications />
          <QueryClientProvider client={queryClient}>

            <SessionProvider>
              <Suspense fallback={
                <Center h='100vh'>
                  <Loader size={'lg'} />
                </Center>
              }>
                {children}

              </Suspense>
            </SessionProvider>
          </QueryClientProvider>
        </ModalsProvider>
      </DatesProvider>

    </MantineProvider>
  );
}