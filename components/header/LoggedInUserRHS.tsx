import React from 'react';
import Link from 'next/link';
import { removeUserData, UserType } from '@/stores/user.store';
import { deleteUserSessionApi } from '@/api/account';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Props {
  user: UserType;
}

export const LoggedInUserRHS: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    onClose();
    deleteUserSessionApi().finally(removeUserData);
    router.push(Paths.login);
  };

  return (
    <>
      <Stack direction='row' spacing={4} align='center'>
        <Link passHref href={Paths.newPost}>
          <Button
            variant='solid'
            colorScheme='teal'
            className='hover:underline'
          >
            New post
          </Button>
        </Link>
        <Menu>
          <MenuButton>
            <Avatar src={user?.profile} name={user?.name} />
          </MenuButton>
          <MenuList>
            <Link href={`${Paths.user}/${user?.email}`} passHref>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link href={Paths.newPost} passHref>
              <MenuItem>New post</MenuItem>
            </Link>
            <Link href={Paths.search} passHref>
              <MenuItem>Search</MenuItem>
            </Link>
            <Link href={Paths.settings} passHref>
              <MenuItem>Settings</MenuItem>
            </Link>
            <MenuDivider />
            <MenuItem onClick={onOpen} className='text-red-400'>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>

      {/* Logout alert */}

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Do you want to quit this cool app?.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Keep me in
              </Button>
              <Button colorScheme='red' onClick={handleLogout} ml={3}>
                Get me out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
