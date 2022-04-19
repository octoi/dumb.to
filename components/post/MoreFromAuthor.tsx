import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { PostType } from '@/utils/types';
import { getPostsOfUserFromDatabaseApi } from '@/api/post';
import { Text } from '@chakra-ui/react';
import { Paths } from '@/utils/paths';

interface Props {
  authorId: string;
  viewingPostId: string;
}

export const MoreFromAuthor: React.FC<Props> = ({
  authorId,
  viewingPostId,
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getPostsOfUserFromDatabaseApi(authorId, 5)
      .then((resPosts: any) => {
        setPosts(resPosts.documents);
      })
      .catch((err) => {
        console.log('Failed to load posts', err);
      });
  }, [authorId, viewingPostId]);

  return (
    <>
      {posts.filter((post) => post.$id !== viewingPostId).length !== 0 && (
        <div className='mt-7'>
          <h2 className='text-xl font-medium mb-5'>More from author</h2>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {posts
              .filter((post) => post.$id !== viewingPostId)
              .map((post, idx) => (
                <Link href={`${Paths.post}/${post.$id}`} passHref key={idx}>
                  <div className='p-3 rounded bg-slate-50 cursor-pointer group transition-all duration-200'>
                    {post.cover && (
                      <img
                        src={post.cover}
                        alt={post.title}
                        className='h-32 w-full object-cover mb-2'
                      />
                    )}
                    <h2 className='font-medium text-lg group-hover:underline'>
                      {post.title}
                    </h2>
                    <Text mt={2} className='text-app-text2'>
                      {moment(post.createdAt).fromNow()}
                    </Text>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
