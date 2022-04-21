import React from 'react';
import { useRouter } from 'next/router';
import { UserType } from '@/stores/user.store';
import { AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { IconButton, useDisclosure, Button, Stack } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { deletePostFromDatabaseApi } from '@/api/post';
import { showToast } from '@/utils/toast';
import { Paths } from '@/utils/paths';

interface Props {
  postId: string;
  user: UserType;
  isAuthor: boolean;
}

export const PostButton: React.FC<Props> = ({ isAuthor, user, postId }) => {
  const router = useRouter();

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeletePost = () => {
    if (!isAuthor) return;

    deletePostFromDatabaseApi(postId)
      .then(() => {
        showToast('Bye old post', 'Deleted post successfully', 'success');
        router.push(Paths.app);
      })
      .catch((err: any) => {
        showToast('Failed to delete post', err?.message, 'error');
      });
  };

  const handleLikePost = () => {};

  return (
    <>
      {/* <IconButton
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
        onClick={isAuthor ? onOpen : handleLikePost}
      /> */}
      <Stack direction='row' gap={2}>
        {isAuthor && (
          <IconButton
            variant='ghost'
            colorScheme='red'
            aria-label='preview'
            icon={<AiOutlineDelete className='text-2xl' />}
            onClick={onOpen}
          />
        )}
        <IconButton
          variant='ghost'
          colorScheme='red'
          aria-label='preview'
          icon={<AiOutlineHeart className='text-2xl' />}
          onClick={handleLikePost}
        />
      </Stack>

      {/* Delete post confirm */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cancel post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleDeletePost();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
