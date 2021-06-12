import Link from 'next/link';
import { Flex, List, ListItem, Text, Button } from "@chakra-ui/react";
import { useAuth } from 'modules/auth';

export default function MainHeader() {
  const { user, loading, signout } = useAuth();

  const onSignout = async () => {
    await signout();
  };

  return (
    <Flex height="16" pl="4" pr="4" justifyContent="space-between" fontSize="13" maxWidth="800" margin="auto">
      <List display="flex" alignItems="center">
        <ListItem mr="4">
          <Link href="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link href="/blog">Blog</Link>
        </ListItem>
      </List>
      <Flex alignItems="center">
        {
          !user && !loading &&
          <Link href="/login">Login</Link>
        }
        {
          user && !loading &&
          <Flex alignItems="center">
            <Text mr="4">
              Hi {user.email}
            </Text>
            <Button size="sm" onClick={onSignout}>Logout</Button>
          </Flex>
        }
      </Flex>
    </Flex>
  );
}
