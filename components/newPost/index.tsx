import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { NewPostForm } from './NewPostForm';
import { Preview } from './Preview';

export enum PageState {
  Edit,
  Preview,
}

export const NewPostItems: React.FC = () => {
  const [pageState, setPageState] = useState(PageState.Edit);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File>();

  return (
    <Flex direction='column'>
      {pageState === PageState.Edit ? (
        <NewPostForm
          loading={loading}
          title={title}
          content={content}
          coverImage={coverImage}
          setPageState={setPageState}
          setLoading={setLoading}
          setTitle={setTitle}
          setContent={setContent}
          setCoverImage={setCoverImage}
        />
      ) : (
        <Preview
          title={title}
          content={content}
          coverImage={coverImage}
          setPageState={setPageState}
        />
      )}
    </Flex>
  );
};
