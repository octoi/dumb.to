import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ChakraWrap } from '@/components/ChakraWrap';
import { AuthWrapper } from '@/components/AuthWrapper';
import { loadDataFromSession } from '@/stores/user.store';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadDataFromSession();
  }, []);

  return (
    <ChakraWrap>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </ChakraWrap>
  );
}
