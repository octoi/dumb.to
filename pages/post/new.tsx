import type { NextPage } from 'next';
import { LayoutHead } from '@/components/Layout';
import { NewPostItems } from '@/components/newPost';
import { Header } from '@/components/header';
import { Footer } from '@/components/Footer';

const NewPost: NextPage = () => {
  return (
    <>
      <LayoutHead title='New post' />
      <Header removeMargin />
      <NewPostItems />
      <Footer />
    </>
  );
};

export default NewPost;
