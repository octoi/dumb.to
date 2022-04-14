import type { NextPage } from 'next';
import { Layout } from '@/components/Layout';
import { RegisterForm } from '@/components/register';

const Register: NextPage = () => {
  return (
    <Layout title='Register'>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
