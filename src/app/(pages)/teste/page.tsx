'use client'

import { OnboardingTour, OnboardingTourController, OnboardingTourStep } from '@gfazioli/mantine-onboarding-tour';
import { Button, Code, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { nprogress } from '@mantine/nprogress';
import Link from 'next/link';
import router from 'next/router';

export default function Demo() {
  const [started, { open, close }] = useDisclosure(false);

  const onboardingSteps: OnboardingTourStep[] = [
    {
      id: 'step-1',
      title: (
        <Title order={4} c="lime">
          Title in a <Code>Title</Code> component
        </Title>
      ),
      content: (
        <Text c="red">
          Description in a <Code>Text</Code> component with color red
        </Text>
      ),
    },
    {
      id: 'step-2',
      title: 'Simple Title String',
      content: (tourController: OnboardingTourController) => (
        <Text>
          Description by using the function <Code>(tourController: OnboardingTourController)</Code> so we can get some more information such as the step: {tourController.currentStepIndex}
        </Text>
      ),
    },
    {
      id: 'step-3',
      content: <>Content in a fragment</>
    },
  ];

  return <>
    <OnboardingTour
      tour={onboardingSteps}
      started={started}
      onOnboardingTourEnd={close}
      onOnboardingTourClose={close}
      maw={400}
    >
      <Stack justify="center" align="center">
        <Button size="md" radius={256} variant="gradient" onClick={open}>
          👉 Click here to Start the Tour 👈
        </Button>

        <Divider my={32} />

        <Stack w={200} gap={32}>
          <Button data-onboarding-tour-id="step-1" onClick={open}>
            Title
          </Button>
          <Button data-onboarding-tour-id="step-2" onClick={open}>
            Description
          </Button>
          <Button data-onboarding-tour-id="step-3" onClick={open}>
            Content
          </Button>
        </Stack>
      </Stack>
    </OnboardingTour>

    <Group justify="center">
      <Button onClick={() => nprogress.start()}>Start</Button>
      <Button onClick={() => nprogress.stop()}>Stop</Button>
      <Button onClick={() => nprogress.increment()}>Increment</Button>
      <Button onClick={() => nprogress.decrement()}>Decrement</Button>
      <Button onClick={() => nprogress.set(50)}>Set 50%</Button>
      <Button onClick={() => nprogress.reset()}>Reset</Button>
      <Button onClick={() => nprogress.complete()}>Complete</Button>
    </Group>


    <Link href="/">teste2</Link>
    <Button onClick={() => {
      router.push('/')
    }} >redirect</Button>
  </>
}