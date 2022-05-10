import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';

export const SearchButton: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const handleSearch = () => {
    let path = `${Paths.search}?query=${searchQuery}`;
    router.push(path);
  };

  return (
    <>
      <IconButton
        variant='solid'
        aria-label='Search'
        icon={<SearchIcon />}
        type='submit'
        className='block md:hidden'
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type='text'
              size='lg'
              variant='filled'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              mr={3}
              disabled={searchQuery.trim().length == 0}
              onClick={handleSearch}
            >
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
