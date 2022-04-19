import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Table, Text, Link, Image, Center } from '@chakra-ui/react';

interface Props {
  markdown: string;
}

export const MarkdownPreview: React.FC<Props> = ({ markdown }) => {
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={ChakraUIRenderer({
        h1: ({ children }) => (
          <h1 className='text-3xl font-bold my-6'>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className='text-2xl font-bold my-5'>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className='text-xl font-bold my-5'>{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className='text-lg font-bold my-5'>{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className='text-base font-bold my-5'>{children}</h5>
        ),
        h6: ({ children }) => (
          <h5 className='text-sm font-bold my-5'>{children}</h5>
        ),
        table: ({ children }) => (
          <Table variant='striped' my={5}>
            {children}
          </Table>
        ),
        p: ({ children }) => (
          <Text my={5} fontSize='lg'>
            {children}
          </Text>
        ),
        a: ({ children, href }) => (
          <Link my={5} href={href} className='font-medium'>
            {children}
          </Link>
        ),
        img: ({ src, alt }) => <img src={src} alt={alt} className='my-5' />,
      })}
      skipHtml
    />
  );
};
