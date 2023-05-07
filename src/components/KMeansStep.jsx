import { v4 as uuidv4 } from "uuid";
import { useCluster, useClusterDispatch } from "@/context/ClusteringContext";
import { kmeansClustering } from "@/utils/kmeans";
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
import { useEffect } from "react";

export default function KMeansStep({ setActiveStep }) {
  const { dataset, clusterSize, loopingMax, clusterResult } = useCluster();
  const dispatch = useClusterDispatch();

  useEffect(() => {
    if (dataset.length > 0) {
      const cluster = kmeansClustering(
        dataset.slice(1),
        clusterSize,
        loopingMax
      );
      dispatch({ type: "SET_CLUSTER_RESULT", payload: cluster });
    }
  }, [dataset, clusterSize, loopingMax]);
  return (
    <Box bg="white" shadow="md" mt="10" p="10" rounded="md" minH="md">
      <Box justifyContent="end" display="flex">
        <Button
          colorScheme="blue"
          variant="ghost"
          bgColor="blue"
          onClick={() => {
            setActiveStep((prev) => prev + 1);
          }}
        >
          Selanjutnya
        </Button>
      </Box>
      <VStack spacing={5} mt={10}>
        {clusterResult?.steps.map((step, index) => (
          <Box w="full" key={uuidv4()}>
            <Box w="full" bgColor="teal.400" p={4} mb={5}>
              <Heading size="md" color="white" textAlign="center">
                Iterasi Ke - {step.iteration}
              </Heading>
            </Box>
            <Box>
              <Box>
                <Heading size="md" mb={6} mt={10}>
                  Penentuan Centroid
                </Heading>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      {step.centroids.map((centroids, index) => (
                        <Tr key={uuidv4()}>
                          <Td>Centroid {index + 1}</Td>
                          {centroids.map((centroid) => (
                            <Td key={uuidv4()}>{centroid}</Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <Heading size="md" mb={6} mt={10}>
                  Perhitungan Euclidean Distance
                </Heading>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Kolom 1</Th>
                        {step.euclideanDistances[0][0].distances.map(
                          (distance, index) => (
                            <Th key={uuidv4()}>Centroid {index + 1}</Th>
                          )
                        )}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {step.euclideanDistances[0].map((euclidean, index) => (
                        <Tr key={uuidv4()}>
                          <Td>{euclidean.data}</Td>
                          {euclidean.distances.map((value) => (
                            <Td key={uuidv4()}>{value}</Td>
                          ))}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <Heading size="md" mb={6} mt={10}>
                  Hasil Clustering
                </Heading>
                <VStack spacing={5}>
                  {step.clusters.map((cluster, index) => (
                    <TableContainer key={uuidv4()} w="full">
                      <Table colorScheme="facebook">
                        <Thead>
                          <Tr>
                            <Th>Kolom 1</Th>
                            <Th>Cluster</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {cluster.data.map((row) => (
                            <Tr key={uuidv4()}>
                              <Td>{row}</Td>
                              <Td>{cluster.cluster}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ))}
                </VStack>
              </Box>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
