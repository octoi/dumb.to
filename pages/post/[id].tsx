import type { GetServerSideProps, NextPage } from 'next';
import type { PostType } from '@/utils/types';
import { getPostFromDatabaseApi } from '@/api/post';
import { GSSPRedirectData } from '@/utils/constants';
import { LayoutHead } from '@/components/Layout';
import { Header } from '@/components/header';
import { Footer } from '@/components/Footer';
import { Post } from '@/components/post';

interface Props {
  post: PostType;
}

export const PostDetailPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <LayoutHead title={post.title} image={post.cover} />
      <Header removeMargin />
      <Post post={post} />
      <Footer />
    </>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id?.toString();

  if (!postId) return GSSPRedirectData;

  const post: any = await getPostFromDatabaseApi(postId).catch(() => {
    return false;
  });

  if (!post) return GSSPRedirectData;

  return {
    props: {
      post,
    },
  };
};
