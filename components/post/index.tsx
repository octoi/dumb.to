import React from 'react';
import moment from 'moment';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import { PostType } from '@/utils/types';
import { MarkdownPreview } from '../MarkdownPreview';
import { Container, Flex, Text, Divider } from '@chakra-ui/react';
import { AuthorData } from './AuthorData';
import { MoreFromAuthor } from './MoreFromAuthor';
import { PostButton } from './PostButton';
import { NewComment } from './NewComment';

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
          <h2 className='text-4xl font-bold'>{post.title}</h2>
          {user && (
            <PostButton postId={post.$id} user={user} isAuthor={isAuthor} />
          )}
        </Flex>
        <Text mb={5} className='text-app-text2'>
          {moment(post.createdAt).fromNow()}
        </Text>
        <MarkdownPreview markdown={post.content} />
        <Divider mt={5} mb={5} />
        <AuthorData authorId={post.userId} />
        <MoreFromAuthor authorId={post.userId} viewingPostId={post.$id} />
        <Divider mt={5} mb={5} />
        {user && <NewComment postId={post.$id} userId={user.id} />}
        
      </Container>
    </div>
  );
};
