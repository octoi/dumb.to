import { Paths } from './paths';

// getServerSideProps redirect to 404 data
export const GSSPRedirectData = {
  redirect: {
    destination: Paths.notFound,
    permanent: false,
  },
  props: {},
};
