import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ChakraWrap } from '@/components/ChakraWrap';
import { loadDataFromSession } from '@/stores/user.store';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    loadDataFromSession();
  }, [])

  return (
    <ChakraWrap>
      <Component {...pageProps} />
    </ChakraWrap>
  );
}
