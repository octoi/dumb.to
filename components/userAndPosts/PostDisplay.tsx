import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { UserType } from '@/stores/user.store';
import { PostType } from '@/utils/types';
import { getUserFromDatabaseApi } from '@/api/account';
import { Paths } from '@/utils/paths';
import { Avatar, Flex, Link as NextLink, Text } from '@chakra-ui/react';

interface Props {
  post: PostType;
  author: UserType | null;
}

export const PostDisplay: React.FC<Props> = ({ post, author }) => {
  const [postAuthor, setPostAuthor] = useState<UserType | null>(author);

  useEffect(() => {
    if (author) return;
    getUserFromDatabaseApi(post.userId).then((userData: any) => {
      setPostAuthor(userData);
    });
  }, [post]);

  return (
    <Link passHref href={`${Paths.post}/${post.$id}`}>
      <NextLink href={`${Paths.post}/${post.$id}`}>
        <div className='bg-slate-50 rounded p-3 mb-2 cursor-pointer'>
          <h2 className='font-medium text-xl'>{post.title}</h2>
          <p className='mt-2 text-app-text2'>
            {moment(post.createdAt).fromNow()}
          </p>
          <Flex align='center' className='mt-3'>
            <Avatar
              src={postAuthor?.profile}
              name={postAuthor?.name || post.userId}
              className='w-10 h-10'
            />
            <Text ml={2} fontSize='lg' fontWeight='medium'>
              {postAuthor?.name || post.userId}
            </Text>
          </Flex>
        </div>
      </NextLink>
    </Link>
  );
};
