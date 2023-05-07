import { Container, Heading, Box, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box w="full" bg="teal.400" textColor="white" py="2rem">
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
      >
        <Heading size="md">K-MEANS CLUSTERING</Heading>
        <HStack spacing={10}>
          <Link as={NextLink} href="/">
            Home
          </Link>
          <Link as={NextLink} href="/clustering">
            Clustering
          </Link>
        </HStack>
      </Container>
    </Box>
  );
}
