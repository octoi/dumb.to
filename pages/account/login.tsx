import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/login';

const Login: NextPage = () => {
  return (
    <Layout title='Register'>
      <LoginForm />
    </Layout>
  );
};

export default Login;
