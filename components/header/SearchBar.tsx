import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { SearchIcon } from '@chakra-ui/icons';
import { colors } from '@/utils/colors';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

interface Props {
  query?: string;
}

export const SearchBar: React.FC<Props> = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchQuery(query || '');
    }
  }, [query]);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    let path = `${Paths.search}?query=${searchQuery}`;
    router.push(path);
  };

  return (
    <form onSubmit={handleFormSubmit} className='hidden md:block'>
      <InputGroup width='md' ml={2}>
        <Input
          variant='filled'
          placeholder='Search'
          className='bg-slate-100'
          focusBorderColor={colors.app.text1}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            variant='ghost'
            aria-label='Search'
            icon={<SearchIcon />}
            type='submit'
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
