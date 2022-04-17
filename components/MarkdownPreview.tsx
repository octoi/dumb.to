import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Table } from '@chakra-ui/react';

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
          <h1 className='text-3xl font-bold my-3'>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className='text-2xl font-bold my-2'>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className='text-xl font-bold my-2'>{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className='text-lg font-bold my-2'>{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className='text-base font-bold my-2'>{children}</h5>
        ),
        h6: ({ children }) => (
          <h5 className='text-sm font-bold my-2'>{children}</h5>
        ),
        table: ({ children }) => (
          <Table variant='striped' className='my-2'>
            {children}
          </Table>
        ),
      })}
      skipHtml
    />
  );
};
