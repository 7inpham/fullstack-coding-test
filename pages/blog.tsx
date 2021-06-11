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
import { useState } from "react";

const articles = [
  {
    id: 1,
    title: 'An article',
    image: 'https://bit.ly/2Z4KKcF',
    content: 'Find some content here'
  },
  {
    id: 2,
    title: 'Another article',
    image: 'https://bit.ly/2Z4KKcF',
    content: 'Find some content here'
  }
];

const Blog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeArticle, setActiveArticle] = useState(null);

  const showArticle = (article) => {
    setActiveArticle({...article});
    onOpen();
  };

  const closeArticle = () => {
    setActiveArticle(null);
    onClose();
  };

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
              <Box borderWidth={1} boxShadow="lg" mb="4" p="8" onClick={() => showArticle(article)}>
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
