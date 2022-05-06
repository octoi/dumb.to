import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { updateData } from './updateData';
import { setUserData, UserType } from '@/stores/user.store';
import { showToast } from '@/utils/toast';

interface Props {
  user: UserType;
  value: string;
  type: 'name' | 'email' | 'password' | 'bio';
}

export const EditInput: React.FC<Props> = ({ user, value, type }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(value || '');
  const [dataSecond, setDataSecond] = useState(''); // only for email update (it requires password)

  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const onClose = () => {
    setData(value || '');
    setDataSecond('');
    onModalClose();
  };

  const handleUpdateData = () => {
    if (loading) return;

    setLoading(true);

    updateData(user.id, type, value, data, dataSecond)
      .then(() => {
        if (type != 'password') {
          setUserData({
            ...user,
            [type]: data,
          });
        }

        showToast(
          'Look at your new profile 👀',
          'updated profile successfully',
          'success'
        );

        onClose();
      })
      .catch((err) => {
        showToast('Failed to update profile', err?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {type !== 'bio' && (
        <Input
          value={type !== 'password' ? value : ''}
          contentEditable={false}
          placeholder={type}
          mt={3}
          size='lg'
          variant='filled'
          onClick={onOpen}
        />
      )}
      {type === 'bio' && (
        <Textarea
          value={value}
          contentEditable={false}
          mt={3}
          size='lg'
          variant='filled'
          placeholder={type}
          onClick={onOpen}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={!loading}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update {type}</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            {type === 'name' && (
              <Input
                placeholder={value}
                value={data}
                onChange={(e) => setData(e.target.value)}
                size='lg'
                type={type}
                variant='filled'
                required
              />
            )}
            {type === 'email' && (
              <>
                <Input
                  placeholder={value}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  size='lg'
                  type='email'
                  variant='filled'
                  required
                />
                <Input
                  mt={3}
                  placeholder='password'
                  value={dataSecond}
                  type='password'
                  onChange={(e) => setDataSecond(e.target.value)}
                  size='lg'
                  variant='filled'
                  required
                />
              </>
            )}
            {type === 'password' && (
              <>
                <Input
                  placeholder='Old password'
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  size='lg'
                  type='password'
                  variant='filled'
                  required
                />
                <Input
                  placeholder='New password'
                  value={dataSecond}
                  onChange={(e) => setDataSecond(e.target.value)}
                  mt={3}
                  size='lg'
                  type='password'
                  variant='filled'
                  required
                />
              </>
            )}
            {type === 'bio' && (
              <Textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                size='lg'
                variant='filled'
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              mr={3}
              disabled={loading}
              onClick={handleUpdateData}
              isLoading={loading}
            >
              Update
            </Button>
            <Button variant='ghost' disabled={loading} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
