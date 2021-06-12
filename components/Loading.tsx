import { Container } from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/progress";

export default function Loading() {
  return (
    <Container centerContent p="10">
      <CircularProgress isIndeterminate size="24px" color="teal"/>
    </Container>
  );
}
