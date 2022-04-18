import React from 'react';
import { useRouter } from 'next/router';
import { CoverImage } from './CoverImage';
import { CancelPost } from './CancelPost';
import { ViewIcon } from '@chakra-ui/icons';
import { PageState } from '.';
import { SetState } from '@/utils/reactTypes';
import { newPost } from './newPost';
import { Paths } from '@/utils/paths';
import { showToast } from '@/utils/toast';
import { useState as useHookState } from '@hookstate/core';
import { userStore } from '@/stores/user.store';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  setPageState: SetState<PageState>;
  title: string;
  setTitle: SetState<string>;
  content: string;
  setContent: SetState<string>;
  coverImage: File | undefined;
  setCoverImage: SetState<File | undefined>;
  loading: boolean;
  setLoading: SetState<boolean>;
}

export const NewPostForm: React.FC<Props> = ({
  title,
  content,
  coverImage,
  loading,
  setTitle,
  setContent,
  setCoverImage,
  setLoading,
  setPageState,
}) => {
  const router = useRouter();

  const userState = useHookState(userStore);
  const user = userState.get();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!user) return;

    newPost(user.id, title, content, coverImage)
      .then((postId) => {
        showToast(
          'Hope everyone likes it 💗',
          'Post created successfully',
          'success'
        );

        const postPath = `${Paths.post}/${postId}`;
        router.push(postPath);
      })
      .catch((err) => {
        showToast('Failed to create post', err?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxW='container.xl' className='mt-10'>
      <form onSubmit={handleFormSubmit}>
        <Flex align='center' justify='space-between' mb={5}>
          <h2 className='text-3xl font-bold'>New Post</h2>
          <Stack direction='row' spacing={2} align='center'>
            <IconButton
              variant='ghost'
              colorScheme='teal'
              aria-label='preview'
              onClick={() => setPageState(PageState.Preview)}
              icon={<ViewIcon fontSize='xl' />}
            />
            <CancelPost disabled={loading} />
          </Stack>
        </Flex>
        <CoverImage
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          disabled={loading}
        />
        <FormControl isRequired>
          <FormLabel fontSize='lg' htmlFor='title'>
            Title ({title.length}/200)
          </FormLabel>
          <Input
            id='title'
            type='text'
            variant='filled'
            placeholder='New post title here'
            size='lg'
            mb={4}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            isRequired
            maxLength={200}
          />
          <FormLabel fontSize='lg'>Content ({content.length}/5000)</FormLabel>
          <Textarea
            placeholder='Write your post content here. . . (Markdown supported)'
            variant='filled'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            size='lg'
            rows={8}
            mb={4}
            disabled={loading}
            maxLength={5000}
          />
        </FormControl>
        <Button
          type='submit'
          isLoading={loading}
          size='lg'
          w='full'
          colorScheme='teal'
          mb={4}
        >
          Publish
        </Button>
      </form>
    </Container>
  );
};
