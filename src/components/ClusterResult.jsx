import { useCluster } from "@/context/ClusteringContext";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  VStack,
} from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";

export default function ClusterResult() {
  const { clusterResult } = useCluster();

  return (
    <Box bg="white" shadow="md" mt="10" p="10" rounded="md" minH="md">
      <Heading size="lg" mb={6}>
        Hasil Akhir Clustering
      </Heading>
      <VStack spacing={5} mt={10}>
        {clusterResult.results.map((cluster, index) => (
          <Box w="full" key={uuidv4()}>
            <Box w="full" bgColor="teal.400" p={4} mb={5}>
              <Heading size="md" color="white" textAlign="center">
                Cluster {index + 1}
              </Heading>
            </Box>
            <TableContainer key={uuidv4()} w="full">
              <Table variant="simple" colorScheme="facebook">
                <Thead>
                  <Tr>
                    <Th>Kolom 1</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cluster.data.map((row) => (
                    <Tr key={uuidv4()}>
                      <Td>{row}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
