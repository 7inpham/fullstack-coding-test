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
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import firebase from 'modules/firebase';
import MainHeader from 'components/MainHeader';
import MainContainer from 'components/MainContainer';

const Blog = () => {
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
        <Box pt="4" pb="4">
          {
            articles.map((article) =>
              <Box key={article.id} borderWidth={1} boxShadow="lg" mb="4" p="8" onClick={() => showArticle(article)}>
                <Image src={article.image} alt={article.title} />
                <Box textAlign="left" mt="4">{article.title}</Box>
              </Box>
            )
          }
        </Box>
      </MainContainer>

      <Modal isOpen={isOpen} onClose={closeArticle}>
        <ModalOverlay />
        {
        activeArticle
        &&
        <ModalContent maxWidth="800">
          <ModalHeader>{activeArticle.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={activeArticle.image} alt={activeArticle.title} />
            <Text mt="4">{activeArticle.content}</Text>
          </ModalBody>
        </ModalContent>
        }
      </Modal>
    </>
  );
};

export default Blog;
