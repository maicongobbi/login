'use client';

import SignInComponent from "@/componets/login/sign/in";
import { Box } from "@mantine/core";

export default function Page() {
  return <>
    <Box maw={400} mx="auto">
      <SignInComponent />
    </Box>

  </>
}