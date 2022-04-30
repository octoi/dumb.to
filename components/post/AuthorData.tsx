import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { UserType } from '@/stores/user.store';
import { getUserFromDatabaseApi } from '@/api/account';
import { Avatar, Flex, Link as ChakraLink } from '@chakra-ui/react';

interface Props {
  authorId: string;
}

export const AuthorData: React.FC<Props> = ({ authorId }) => {
  const [author, setAuthor] = useState<UserType | undefined>();

  useEffect(() => {
    getUserFromDatabaseApi(authorId)
      .then((data: any) => {
        setAuthor(data);
      })
      .catch((err) => {
        console.log('Failed to get user', err);
      });
  }, [authorId]);

  return (
    <>
      {author && (
        <Flex align='center'>
          <Avatar src={author.profile} name={author.name} />
          <Flex ml={2} direction='column'>
            <Link href={`${Paths.user}/${authorId}`} passHref>
              <ChakraLink fontSize='xl' fontWeight='medium'>
                {author.name}
              </ChakraLink>
            </Link>
            {author.bio}
          </Flex>
        </Flex>
      )}
    </>
  );
};
