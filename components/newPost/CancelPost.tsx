import React from 'react';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { CloseIcon } from '@chakra-ui/icons';
import { Button, IconButton, useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

interface Props {
  disabled: boolean;
}

export const CancelPost: React.FC<Props> = ({ disabled }) => {
  const router = useRouter();

  const cancelRef = React.useRef<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <IconButton
        aria-label='Remove image'
        colorScheme='red'
        variant='ghost'
        disabled={disabled}
        icon={<CloseIcon />}
        onClick={onOpen}
      />

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
                Keep editing
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose();
                  router.push(Paths.app);
                }}
                ml={3}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
