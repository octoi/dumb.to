import React from 'react';
import { Container } from '@chakra-ui/react';
import { MarkdownPreview } from '../MarkdownPreview';
import { PostType } from '@/utils/types';

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => {
  return (
    <div>
      {post.cover && (
        <img
          src={post.cover}
          alt={post.id}
          className='w-full h-72 object-cover'
        />
      )}
      <Container maxW='container.xl' className='mt-10'>
        <h2 className='text-3xl font-bold mb-8'>{post.title}</h2>
        <MarkdownPreview markdown={post.content} />
      </Container>
    </div>
  );
};
