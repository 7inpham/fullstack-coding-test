import "styles/globals.css";
import { AuthProvider } from "modules/auth";
import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
