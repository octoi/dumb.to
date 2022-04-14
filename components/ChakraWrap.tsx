import { colors } from '@/utils/colors';
import { ReactChild } from '@/utils/reactProps';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({ colors });

export const ChakraWrap: ReactChild = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
