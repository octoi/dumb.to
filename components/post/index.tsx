import React from 'react';
import moment from 'moment';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { PostType } from '@/utils/types';
import { MarkdownPreview } from '../MarkdownPreview';
import { Container, Flex, IconButton, Text } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';
import { AuthorData } from './AuthorData';
import { MoreFromAuthor } from './MoreFromAuthor';

interface Props {
  post: PostType;
}

export const Post: React.FC<Props> = ({ post }) => {
  const userState = useHookState(userStore);
  const user = userState.get();

  const isAuthor = user?.id == post.userId;

  return (
    <div>
      {post.cover && (
        <img
          src={post.cover}
          alt={post.$id}
          className='w-full h-72 object-cover'
        />
      )}
      <Container maxW='container.xl' className='mt-10'>
        <Flex align='center' justify='space-between' mb={2}>
          <h2 className='text-3xl font-bold'>{post.title}</h2>
          {user && (
            <IconButton
              variant='ghost'
              colorScheme='red'
              aria-label='preview'
              icon={
                isAuthor ? (
                  <AiOutlineDelete className='text-2xl' />
                ) : (
                  <AiOutlineHeart className='text-2xl' />
                )
              }
              onClick={() => {}}
            />
          )}
        </Flex>
        <Text mb={5} className='text-app-text2'>
          {moment(post.createdAt).fromNow()}
        </Text>
        <MarkdownPreview markdown={post.content} />
        <AuthorData authorId={post.userId} />
        <MoreFromAuthor authorId={post.userId} viewingPostId={post.$id} />
      </Container>
    </div>
  );
};
