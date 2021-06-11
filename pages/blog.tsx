import Head from "next/head";
import {
  Container,
  Box,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import firebase from 'modules/firebase';

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
    const fetchData = async () => {
      const db = firebase.firestore();
      const response = await db.collection('articles')
      const data = await response.get();
      const articles = data.docs.map((doc) => {
        const fields = doc.data();
        return {
          id: doc.id,
          ...fields
        }
      });
      setArticles(articles);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container align="center">
        <Box p="8" maxWidth="500">
          {
            articles.map((article) =>
              <Box key={article.id} borderWidth={1} boxShadow="lg" mb="4" p="8" onClick={() => showArticle(article)}>
                <Image src={article.image} alt={article.title} />
                <Box>{article.title}</Box>
              </Box>
            )
          }
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={closeArticle}>
        {
          activeArticle
          &&
          <ModalContent>
            <ModalHeader>{activeArticle.title}</ModalHeader>
            <ModalBody>
              {activeArticle.content}
            </ModalBody>
          </ModalContent>
        }
      </Modal>
    </>
  );
};

export default Blog;
