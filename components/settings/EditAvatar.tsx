import React, { useState } from 'react';
import { setUserData, UserType } from '@/stores/user.store';
import { RiImageEditLine } from 'react-icons/ri';
import { showToast } from '@/utils/toast';
import {
  Avatar,
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { uploadAvatar } from './uploadAvatar';

interface Props {
  user: UserType;
}

export const EditAvatar: React.FC<Props> = ({ user }) => {
  const [avatar, setAvatar] = useState<File | string>(user.profile);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSaveAvatar = async () => {
    setLoading(true);

    if (avatar === user.profile) {
      return;
    }

    uploadAvatar(avatar, user.id)
      .then((imageURL) => {
        setUserData({
          ...user,
          profile: imageURL as string,
        });
        showToast(
          'Look at your new avatar 👀',
          'Updated avatar successfully',
          'success'
        );
        onClose();
      })
      .catch((err) => {
        showToast('Failed to update avatar', err?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='w-full h-40 flex items-center justify-center relative'>
      <img
        src={user.profile}
        alt={user.name}
        className='h-40 w-full absolute object-cover brightness-50'
      />
      <IconButton
        variant='solid'
        colorScheme='twitter'
        aria-label='Edit avatar'
        icon={<RiImageEditLine className='text-2xl' />}
        className='absolute right-1 bottom-1'
        onClick={onOpen}
        disabled={loading}
      />
      <Avatar src={user.profile} name={user.name} size='xl' />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={!loading}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Avatar</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            {/* file preview */}
            <Center>
              <Avatar
                src={
                  typeof avatar == 'string'
                    ? avatar
                    : URL.createObjectURL(avatar)
                }
                name={user.name}
                mb={3}
                size='lg'
              />
            </Center>

            {/* Local file upload  */}
            <div
              onClick={() => !loading && fileInputRef.current.click()}
              className='h-32 flex items-center justify-center border-dotted border-2  cursor-pointer hover:bg-gray-100 transition-all'
            >
              <p className='text-lg text-app-text2'>Upload new avatar</p>
              <input
                ref={fileInputRef}
                type='file'
                className='hidden'
                accept='image/*'
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length === 0) {
                    setAvatar(user.profile);
                    return;
                  }

                  if (e.target.files[0].type.includes('image/')) {
                    setAvatar(e.target.files[0]);
                  } else {
                    showToast(
                      'Unsupported file type',
                      'please select an image',
                      'error'
                    );
                  }
                }}
              />
            </div>

            {/* use default avatar */}
            <Button
              size='lg'
              mt={3}
              className='w-full'
              colorScheme='teal'
              variant='solid'
              disabled={loading}
              onClick={() => {
                setAvatar(
                  `https://avatars.dicebear.com/api/initials/${user.name}.svg`
                );
              }}
            >
              Use default avatar
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={loading}
              colorScheme='teal'
              mr={3}
              onClick={handleSaveAvatar}
            >
              Save
            </Button>
            <Button disabled={loading} variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
