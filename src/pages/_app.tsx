import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import './register.scss';



function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
   
  )
}

export default MyApp
