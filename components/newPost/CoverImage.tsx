import React from 'react';
import { ReactComponent } from '@/utils/reactProps';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { showToast } from '@/utils/toast';

interface Props {
  coverImage: File | undefined;
  setCoverImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  disabled: boolean;
}

export const CoverImage: ReactComponent<Props> = ({
  coverImage,
  setCoverImage,
  disabled,
}) => {
  const fileInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <div className='h-24 md:h-36 mb-4'>
      {!coverImage && (
        <div
          onClick={() => !disabled && fileInputRef.current.click()}
          className='h-full flex items-center justify-center border-dotted border-2  cursor-pointer hover:bg-gray-100 transition-all'
        >
          <p className='text-lg text-app-text2'>
            Upload a cover image (optional)
          </p>
          <input
            ref={fileInputRef}
            type='file'
            className='hidden'
            accept='image/*'
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) {
                setCoverImage(undefined);
                return;
              }

              if (e.target.files[0].type.includes('image/')) {
                setCoverImage(e.target.files[0]);
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
      )}
      {coverImage && (
        <div className='w-full h-full relative'>
          <img
            className='h-full w-full object-cover'
            src={URL.createObjectURL(coverImage)}
            alt={coverImage.name}
          />
          <IconButton
            aria-label='Remove image'
            colorScheme='red'
            className='absolute top-0 right-0'
            size='xs'
            onClick={() => setCoverImage(undefined)}
            icon={<CloseIcon />}
          />
        </div>
      )}
    </div>
  );
};
