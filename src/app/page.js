"use client";

import ClusterConfig from "@/components/ClusterConfig";
import ClusterResult from "@/components/ClusterResult";
import KMeansStep from "@/components/KMeansStep";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import UploadDataset from "@/components/UploadDataset";
import ClusterProvider from "@/context/ClusteringContext";
import {
  Button,
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

import { Box, Container, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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
      <main className="">
        <Navbar />
        <Container
          maxW="container.xl"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          minH="md"
          mt={10}
        >
          <Box mt={10} width="80%">
            <Heading textAlign="center" size="lg">
              K-MEANS CLUSTERING
            </Heading>
          </Box>
          <Link
            className="mt-10 bg-teal-400 px-8 py-3 rounded-md text-white hover:bg-teal-500"
            href="/clustering"
          >
            Mulai Clustering
          </Link>
        </Container>
      </main>
    </>
  );
}
