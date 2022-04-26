import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserType } from '@/stores/user.store';
import { AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { deletePostFromDatabaseApi } from '@/api/post';
import { showToast } from '@/utils/toast';
import { Paths } from '@/utils/paths';
import { getPostLikesApi, likePostApi } from '@/api/like';
import {
  IconButton,
  useDisclosure,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { notifyUserApi } from '@/api/notification';

interface Props {
  postId: string;
  authorId: string;
  user: UserType;
  isAuthor: boolean;
}

export const PostButton: React.FC<Props> = ({
  isAuthor,
  user,
  postId,
  authorId,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isUserLiked, setIsUserLiked] = useState(false);

  const router = useRouter();

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getPostLikesApi(postId).then((data) => {
      setLikeCount(data.total);

      if (
        data.documents.filter((like: any) => like?.userId === user.id)
          .length !== 0
      ) {
        setIsUserLiked(true);
      }
    });
  }, []);

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

  const handleLikePost = () => {
    if (isAuthor) return;

    likePostApi(postId, user.id)
      .then(async () => {
        setLikeCount((prev) => (isUserLiked ? prev - 1 : prev + 1));
        setIsUserLiked((prev) => !prev);

        if (!isUserLiked && authorId !== user?.id) {
          notifyUserApi(authorId, user?.id, postId, 'liked your post').catch(
            console.log
          );
        }
      })
      .catch((err) => {
        showToast('Oops something went wrong', err?.message, 'error');
      });
  };

  return (
    <>
      <Stack direction='row'>
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
          variant={isUserLiked ? 'solid' : 'ghost'}
          colorScheme='teal'
          aria-label='preview'
          icon={
            <Stack direction='row' gap={1} p={2} align='center'>
              <AiOutlineHeart className='text-2xl' />
              <Text fontSize='lg'>{likeCount}</Text>
            </Stack>
          }
          disabled={isAuthor}
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
