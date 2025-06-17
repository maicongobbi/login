'use client'
import Providers from '@/lib/providers';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';



import React from 'react';


export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" >
      <head>

      </head>
      <body>
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
