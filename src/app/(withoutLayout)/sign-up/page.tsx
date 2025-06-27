'use client'

import SignUp from "@/componets/login/sign/up"
import { Box } from "@mantine/core"

export default function Page() {
  console.log('SignUp page loaded')

  return <>
    <Box mt='md'
      maw={400} mx="auto">

      <SignUp />
    </Box>
  </>
}