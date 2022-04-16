import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Button, Stack } from '@chakra-ui/react';

export const GuestUserRHS: React.FC = () => {
  return (
    <Stack direction='row' spacing={4} align='center'>
      <Link passHref href={Paths.login}>
        <Button
          variant='ghost'
          className='text-app-text1 hover:underline hidden md:block'
        >
          Log in
        </Button>
      </Link>

      <Link passHref href={Paths.register}>
        <Button variant='solid' colorScheme='teal' className='hover:underline'>
          Create account
        </Button>
      </Link>
    </Stack>
  );
};
