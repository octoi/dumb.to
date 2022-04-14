import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Button, Container, Flex, IconButton, Stack } from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { SearchIcon } from '@chakra-ui/icons';

export const Header: React.FC = () => {
  return (
    <div className='bg-slate-50'>
      <Container maxW='container.xl' py={3}>
        <Flex alignItems='center' justify='space-between'>
          <Flex alignItems='center'>
            <Link href={Paths.app} passHref>
              <img
                src='/dumb.svg'
                alt='Dumb.to'
                className='w-20 cursor-pointer'
              />
            </Link>

            <SearchBar />
          </Flex>

          <Stack direction='row' spacing={4} align='center'>
            <Link passHref href={Paths.login}>
              <Button
                variant='ghost'
                className='text-app-text1 hover:underline hidden md:block'
              >
                Log in
              </Button>
            </Link>
            <Link passHref href={Paths.search}>
              <IconButton
                variant='solid'
                aria-label='Search'
                icon={<SearchIcon />}
                type='submit'
                className='block md:hidden'
              />
            </Link>
            <Link passHref href={Paths.register}>
              <Button
                variant='outline'
                className='text-app-text1 border-app-blue1 hover:underline hover:bg-app-blue1'
              >
                Create account
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Container>
    </div>
  );
};
