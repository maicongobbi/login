'use client';

import ResetPassword from "@/componets/login/reset-password";
import { Box } from "@mantine/core";

export default function Page() {
  return <>
    <Box maw={400} mx="auto">
      <ResetPassword />
    </Box>

  </>
}