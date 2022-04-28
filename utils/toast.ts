import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const toast = createStandaloneToast({ colorMode: 'dark' });

export const showToast = (
  title: string,
  description: string,
  status: 'error' | 'success' | 'info',
  options?: UseToastOptions
) => {
  toast({
    title,
    description,
    status,
    position: 'top-right',
    isClosable: true,
    duration: 3000,
    ...options,
  });
};
