import Head from "next/head";
import styles from "styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react"

const Home = () => {
  const dynamicTextRef = useRef(null);
  const inputRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  useEffect(() => {
    inputRef.current.value = dynamicTextRef.current.getValue();
  });

  return (
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
  );
};

export default Home;
