import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/login';

const Login: NextPage = () => {
  return (
    <Layout title='Login'>
      <LoginForm />
    </Layout>
  );
};

export default Login;
