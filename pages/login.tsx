import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";
import { useAuth } from "modules/auth";
import { Button } from "@chakra-ui/react";
import Loading from "components/Loading";

const Login = () => {
  const { user, loading, signin, signout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await signout();
  };

  const onLogin = async () => {
    try {
      await signin('abc@mail.com', '123456');
      router.push('/');
    } catch(e) {
      alert(e);
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          user
            ? <Button onClick={onLogout}>Logout</Button>
            : <Button onClick={onLogin}>Login</Button>
        }
      </main>
    </div>
  );
};

export default Login;
