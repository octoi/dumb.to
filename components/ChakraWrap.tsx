import { ReactComponent } from '@/utils/reactProps';
import { ChakraProvider, theme } from '@chakra-ui/react';

export const ChakraWrap: ReactComponent = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
