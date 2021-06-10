import Head from "next/head";
import styles from "styles/Home.module.css";
import { useAuth } from "context/auth";

const Login = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user}
      </main>
    </div>
  );
};

export default Login;
