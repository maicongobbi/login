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

import {
  ClerkProvider
} from '@clerk/nextjs';
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from '@mantine/nprogress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, type ReactNode } from "react";

import { ptBR } from '@clerk/localizations';

dayjs.locale('pt-br');
const queryClient = new QueryClient();
/* import 'mantine-react-table/styles.css'; */
export default function Providers({ children }: { children: ReactNode }) {

  return (
    <MantineProvider >
      <ClerkProvider localization={ptBR}>

        <DatesProvider settings={{ locale: 'pt-BR' }}>
          <ModalsProvider>
            <NavigationProgress />
            <Notifications />
            <QueryClientProvider client={queryClient}>

              {/*  <SessionProvider> */}
              <Suspense fallback={
                <Center h='100vh'>
                  <Loader size={'lg'} />
                </Center>
              }>
                {children}

              </Suspense>
              {/*    </SessionProvider> */}
            </QueryClientProvider>
          </ModalsProvider>
        </DatesProvider>

      </ClerkProvider>
    </MantineProvider>
  );
}