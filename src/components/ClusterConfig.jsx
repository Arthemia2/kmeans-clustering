import { useClusterDispatch } from "@/context/ClusteringContext";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ClusterConfig({ setActiveStep }) {
  const dispatch = useClusterDispatch();
  const [clusterSize, setClusterSize] = useState(2);
  const [loopingMax, setLoopingMax] = useState(100);

  const nextHandler = () => {
    setActiveStep((prev) => prev + 1);
    dispatch({ type: "SET_CLUSTER_SIZE", payload: clusterSize });
    dispatch({ type: "SET_LOOPING_MAX", payload: loopingMax });
  };

  return (
    <Box bg="white" shadow="md" mt="10" p="10" rounded="md">
      <Box justifyContent="end" display="flex" mb={10}>
        <Button
          colorScheme="blue"
          variant="ghost"
          bgColor="blue"
          onClick={nextHandler}
        >
          Selanjutnya
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <FormControl width="md">
          <VStack spacing={5}>
            <Box w="full">
              <FormLabel>Cluster Size</FormLabel>
              <Input
                type="number"
                defaultValue={clusterSize}
                onChange={(e) => setClusterSize(e.currentTarget.value)}
              />
              <FormHelperText>
                Masukkan jumlah cluster yang diinginkan
              </FormHelperText>
            </Box>
            <Box w="full">
              <FormLabel>Looping Max</FormLabel>
              <Input
                type="number"
                defaultValue={loopingMax}
                onChange={(e) => setLoopingMax(e.currentTarget.value)}
              />
              <FormHelperText>
                Masukkan jumlah perulangan maksimum yang diinginkan
              </FormHelperText>
            </Box>
          </VStack>
        </FormControl>
      </Box>
    </Box>
  );
}
