import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "modules/auth";
import { Alert, AlertDescription, AlertIcon, Box, Button, Container, FormControl, FormLabel, Heading, Input, CircularProgress, Link, Text } from "@chakra-ui/react";
import Loading from "components/Loading";
import MainContainer from "components/MainContainer";

const Login = () => {
  const router = useRouter();
  const { user, loading, signin, signup, signout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [inSigninMode, setInSigninMode] = useState(true);

  const toggleMode = () => {
    setMessage('');
    setInSigninMode(!inSigninMode);
  };

  const onInputChange = (event) => {
    setMessage('');
    const name = event.target.name;
    if (name === 'email') {
      setEmail(event.target.value);
      return;
    }
    if (name === 'password') {
      setPassword(event.target.value);
      return;
    }
  };

  const onSubmit = async (event) => {
    setProcessing(true);
    setMessage('');
    event.preventDefault();
    try {
      if (inSigninMode) {
        await signin(email, password);
      } else {
        await signup(email, password);
      }
      router.push('/');
    } catch(e) {
      setMessage(String(e));
    } finally {
      setProcessing(false);
    }
  };

  const onSignout = async () => {
    setProcessing(true);
    setMessage('');
    try {
      await signout();
    } catch(e) {
      setMessage(String(e));
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>Login Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
      user
      ?
      <MainContainer>
        <Box mt="6">
          <Button width="full" disabled={processing} onClick={onSignout}>
            Sign Out
          </Button>
        </Box>
      </MainContainer>
      :
      <MainContainer>
        <Box my={4}>
          <Alert status="error" borderRadius={4} hidden={!message}>
            <AlertIcon />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </Box>
        <Box borderWidth={1} borderRadius={8} boxShadow="lg" padding="" maxWidth="500" p="8">
          <Box textAlign="center">
            <Heading>
              { inSigninMode ? 'Sign In' : 'Sign Up' }
            </Heading>
          </Box>
          <Box mt="4">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} name="email" onChange={onInputChange} />
              </FormControl>
              <FormControl mt="4" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} name="password" onChange={onInputChange} />
              </FormControl>
              <Button width="full" mt="6" type="submit" disabled={processing}>
                {
                  processing
                    ? <CircularProgress isIndeterminate size="24px" color="teal"/>
                    : 'Submit'
                }
              </Button>
              {
                !processing
                &&
                <Link>
                  <Text mt="4" onClick={toggleMode}>
                    {
                      inSigninMode
                        ? 'Not have an account yet?'
                        : 'Already registered?'
                    }
                  </Text>
                </Link>
              }
            </form>
          </Box>
        </Box>
      </MainContainer>
      }
    </>
  );
};

export default Login;
