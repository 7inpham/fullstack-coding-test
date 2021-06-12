import Head from "next/head";
import { useRef } from "react";
import { Input, Box, Container } from "@chakra-ui/react";
import DynamicText from "components/DynamicText";
import ProtectedContent from "components/ProtectedContent";
import MainHeader from "components/MainHeader";
import MainContainer from "components/MainContainer";

const Home = () => {
  const dynamicTextRef = useRef(null);
  const inputRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  const onOK = () => {
    inputRef.current.value = dynamicTextRef.current.getValue();
  };

  return (
    <>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainHeader/>

      <MainContainer>
        <ProtectedContent onOK={onOK}>
          <Box pt="4" pb="4" maxWidth="500">
            <DynamicText ref={dynamicTextRef} />
            <Input onChange={onChange} ref={inputRef} />
          </Box>
        </ProtectedContent>
      </MainContainer>
    </>
  );
};

export default Home;
