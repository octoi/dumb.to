import type { GetServerSideProps, NextPage } from 'next';
import type { UserType } from '@/stores/user.store';
import { GSSPRedirectData } from '@/utils/constants';
import { Layout } from '@/components/Layout';
import { getUserFromDatabaseApi } from '@/api/account';
import { UserAndPosts } from '@/components/userAndPosts';

interface Props {
  targetUser: UserType;
}

export const UserDetailPage: NextPage<Props> = ({ targetUser }) => {
  return (
    <Layout title={targetUser.name} image={targetUser.profile}>
      <UserAndPosts user={targetUser} loadUserPosts />
    </Layout>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const targetUserId = params?.id?.toString();

  if (!targetUserId) return GSSPRedirectData;

  const targetUser: any = await getUserFromDatabaseApi(targetUserId).catch(
    () => {
      return false;
    }
  );

  if (!targetUser) return GSSPRedirectData;

  let user = {
    ...targetUser,
    id: targetUser?.$id,
  };

  return {
    props: {
      targetUser: user,
    },
  };
};
