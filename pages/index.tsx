import Head from "next/head";
import { useRef } from "react";
import { Input } from "@chakra-ui/react";
import styles from "styles/Home.module.css";
import DynamicText from "components/DynamicText";
import ProtectedPage from "components/ProtectedPage";

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
    <ProtectedPage onOK={onOK}>
      <div className={styles.container}>
        <Head>
          <title>Coding Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <DynamicText ref={dynamicTextRef} />
          <Input onChange={onChange} ref={inputRef} />
        </main>
      </div>
    </ProtectedPage>
  );
};

export default Home;
