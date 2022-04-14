import { ChakraWrap } from '@/components/ChakraWrap';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraWrap>
      <Component {...pageProps} />
    </ChakraWrap>
  );
}
