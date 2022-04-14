import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className='mt-10 p-10 flex items-center justify-center text-app-text2'>
      Made with
      <svg
        stroke-width='0'
        viewBox='0 0 512 512'
        focusable='false'
        className='mx-1 fill-red-400'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path>
      </svg>
      <a
        href='https://github.com/fadhilsaheer'
        className='hover:text-app-text1 transition-all font-medium'
      >
        Fadhil
      </a>
    </div>
  );
};
