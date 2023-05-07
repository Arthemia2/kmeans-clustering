import CSVReader from "@/components/CSVReader";
import { useCluster } from "@/context/ClusteringContext";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
} from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export default function UploadDataset({ setActiveStep }) {
  const { dataset } = useCluster();

  return (
    <Box bg="white" shadow="md" mt="10" p="10" rounded="md" minH="md">
      <Box justifyContent="end" display="flex" mb={10}>
        <Button
          colorScheme="blue"
          variant="ghost"
          bgColor="blue"
          isDisabled={dataset.length === 0}
          onClick={() => {
            setActiveStep((prev) => prev + 1);
          }}
        >
          Selanjutnya
        </Button>
      </Box>
      <Box>
        <Heading size="md" mb={5} textAlign="center">
          Upload your dataset
        </Heading>
        <CSVReader />
      </Box>
      {dataset.length > 0 && (
        <Box mt={10}>
          <Heading size="md" mb={6}>
            Table Dataset
          </Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="facebook">
              <Thead>
                <Tr>
                  {dataset[0].map((name) => (
                    <Th key={name}>{name}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {dataset.slice(1).map((data, index) => (
                  <Tr key={uuidv4()}>
                    {data.map((row) => (
                      <Td key={uuidv4()}>{row}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
