import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/paths';
import { UserType } from '@/stores/user.store';
import { getUserFormDatabaseApi } from '@/api/account';
import { Avatar, Flex, Link as ChakraLink } from '@chakra-ui/react';

interface Props {
  authorId: string;
}

export const AuthorData: React.FC<Props> = ({ authorId }) => {
  const [author, setAuthor] = useState<UserType | undefined>();

  useEffect(() => {
    getUserFormDatabaseApi(authorId)
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
          <Link href={`${Paths.user}/${authorId}`} passHref>
            <ChakraLink ml={2} fontSize='xl' fontWeight='medium'>
              {author.name}
            </ChakraLink>
          </Link>
        </Flex>
      )}
    </>
  );
};
