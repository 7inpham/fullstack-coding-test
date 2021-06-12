import Head from "next/head";
import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
  useDisclosure,
  ListItem,
  List,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Flex,
  Heading
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import firebase from 'modules/firebase';
import MainHeader from 'components/MainHeader';
import MainContainer from 'components/MainContainer';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ articles, setArticles ] = useState([]);
  const [ activeArticle, setActiveArticle ] = useState(null);

  const showArticle = (article) => {
    setActiveArticle({...article});
    onOpen();
  };

  const closeArticle = () => {
    setActiveArticle(null);
    onClose();
  };

  useEffect(() => {
    const firestore = firebase.firestore();
    const unsubscribe = firestore.collection('articles').onSnapshot((snapshot) => {
      const articles = snapshot.docs.map((doc) => {
      const fields = doc.data();
        return {
          id: doc.id,
          ...fields
        }
      });
      setArticles(articles);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainHeader/>

      <MainContainer>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h2" size="md" textAlign="left">Manage Blog Articles</Heading>
          <Button>New</Button>
        </Flex>
        <List pt="4" pb="4">
          {
            articles.map((article) =>
              <ListItem key={article.id} borderWidth={1} mb="4" p="4">
                <Flex alignItems="center" justifyContent="space-between">
                  <Text textAlign="left">{article.title}</Text>
                  <Button onClick={() => showArticle(article)}>Edit</Button>
                </Flex>
              </ListItem>
            )
          }
        </List>
      </MainContainer>

      <Modal isOpen={isOpen} onClose={closeArticle}>
        <ModalOverlay />
        {
        activeArticle
        &&
        <ModalContent maxWidth="800">
          <ModalHeader>Article #{activeArticle.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={activeArticle.title}/>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Image URL</FormLabel>
              <Input type="text" value={activeArticle.image}/>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Content</FormLabel>
              <Textarea value={activeArticle.content}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red">Delete</Button>
            <Button ml="4" colorScheme="teal">Update</Button>
          </ModalFooter>
        </ModalContent>
        }
      </Modal>
    </>
  );
};

export default Dashboard;
