import React, { useState } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { Button, Flex, Input } from '@chakra-ui/react';
import { registerUser } from './register';
import { showToast } from '@/utils/toast';

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    registerUser(name, email, password)
      .then(() => {
        showToast(
          `Welcome ${name} to dumb.to`,
          'Registered an account successfully',
          'success'
        );
      })
      .catch(([title, description]) => {
        showToast(title, description, 'error');
      });

    setLoading(false);
  };

  return (
    <div>
      <Flex direction='column'>
        <form onSubmit={handleFormSubmit}>
          <h2 className='text-3xl font-bold mb-5'>Register</h2>
          <Input
            type='text'
            variant='filled'
            placeholder='Name'
            size='lg'
            mb={4}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
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
            Create an account
          </Button>
          <p className='text-app-text2'>
            Already have an account ?{' '}
            <Link href={Paths.login} passHref>
              <span className='font-medium cursor-pointer hover:text-app-text1 underline'>
                Login
              </span>
            </Link>
          </p>
        </form>
      </Flex>
    </div>
  );
};
