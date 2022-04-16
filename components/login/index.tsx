import React, { useState } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Button, Flex, Input } from '@chakra-ui/react';
import { loginUserApi } from '@/api/account';
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/router';
import { loadDataFromSession } from '@/stores/user.store';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    loginUserApi(email, password)
      .then((userData) => {
        showToast(
          'Good to see you again!',
          'Logged in successfully',
          'success'
        );

        loadDataFromSession();

        const nextPath = router.query?.next?.toString() || Paths.app;
        router.push(nextPath);
      })
      .catch((err) => {
        showToast('Failed to login user', err?.message, 'error');
      });

    setLoading(false);
  };

  return (
    <div>
      <Flex direction='column'>
        <form onSubmit={handleFormSubmit}>
          <h2 className='text-3xl font-bold mb-5'>Login</h2>
          <Input
            type='email'
            variant='filled'
            placeholder='Email'
            size='lg'
            mb={4}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            type='password'
            variant='filled'
            placeholder='Password'
            size='lg'
            mb={4}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            type='submit'
            isLoading={loading}
            size='lg'
            w='full'
            colorScheme='teal'
            mb={4}
          >
            Get me in
          </Button>
          <p className='text-app-text2'>
            Dont have an account ?{' '}
            <Link href={Paths.register} passHref>
              <span className='font-medium cursor-pointer hover:text-app-text1 underline'>
                Create an account
              </span>
            </Link>
          </p>
        </form>
      </Flex>
    </div>
  );
};
