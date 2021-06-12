import { Container } from "@chakra-ui/react";

export default function MainContainer({ children }) {
  return (
    <Container align="center" maxWidth="800">
      {children}
    </Container>
  );
}
