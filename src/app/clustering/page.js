"use client";

import ClusterConfig from "@/components/ClusterConfig";
import ClusterResult from "@/components/ClusterResult";
import KMeansStep from "@/components/KMeansStep";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import UploadDataset from "@/components/UploadDataset";
import ClusterProvider from "@/context/ClusteringContext";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  { title: "Dataset", description: "Upload dataset" },
  { title: "Tentukan Cluster", description: "Menentukan jumlah cluster" },
  { title: "Proses K-Means", description: "Proses clustering" },
  { title: "Hasil Clustring", description: "Menampilkan hasil clustering" },
];

import { Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Clustering() {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 1000);
  }, []);

  return (
    <>
      <SplashScreen isShow={isShow} />
      <ClusterProvider>
        <main className="">
          <Navbar />
          <Container maxW="container.xl">
            <Box bg="white" shadow="md" mt="10" p="10" rounded="md">
              <Box>
                <Stepper index={activeStep} colorScheme="teal">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>

                      <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            {activeStep === 1 && (
              <UploadDataset setActiveStep={setActiveStep} />
            )}
            {activeStep === 2 && (
              <ClusterConfig setActiveStep={setActiveStep} />
            )}
            {activeStep === 3 && <KMeansStep setActiveStep={setActiveStep} />}
            {activeStep === 4 && <ClusterResult />}
          </Container>
        </main>
      </ClusterProvider>
    </>
  );
}
