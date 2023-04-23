
import { ChakraProvider } from '@chakra-ui/react'
import 'components/styles/globals.css'
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <ChakraProvider>
      {" "}
      <Component {...pageProps} />
      </ChakraProvider>
      </SessionProvider>
    
  );
}
