import React from 'react';
import Head from 'next/head';
import { ReactChildWithProps } from '@/utils/reactProps';
import { Header } from './header';
import { Footer } from './Footer';
import { Container } from '@chakra-ui/react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export const Layout: ReactChildWithProps<Props> = ({
  children,
  title,
  description,
  image,
}) => {
  title = title || 'DUMB Community 🤯';
  description =
    description ||
    'A constructive and inclusive social network blogging site for dumbs.';
  image = image || '/dumb.svg';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href={image} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      <Container maxW='container.xl'>{children}</Container>
      <Footer />
    </>
  );
};
