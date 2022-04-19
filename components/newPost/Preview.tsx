import React from 'react';
import { SetState } from '@/utils/reactTypes';
import { PageState } from '.';
import { Container, Flex, IconButton } from '@chakra-ui/react';
import { MarkdownPreview } from '../MarkdownPreview';
import { EditIcon } from '@chakra-ui/icons';

interface Props {
  setPageState: SetState<PageState>;
  title: string;
  content: string;
  coverImage: File | undefined;
}

export const Preview: React.FC<Props> = ({
  title,
  content,
  coverImage,
  setPageState,
}) => {
  return (
    <div>
      {coverImage && (
        <img
          src={URL.createObjectURL(coverImage)}
          alt={coverImage.name}
          className='w-full h-72 object-cover'
        />
      )}
      <Container maxW='container.xl' className='mt-10'>
        <Flex align='center' justify='space-between' mb={5}>
          <h2 className='text-4xl font-bold'>{title}</h2>
          <IconButton
            variant='ghost'
            colorScheme='teal'
            aria-label='preview'
            onClick={() => setPageState(PageState.Edit)}
            icon={<EditIcon fontSize='xl' />}
          />
        </Flex>
        <MarkdownPreview markdown={content} />
      </Container>
    </div>
  );
};
