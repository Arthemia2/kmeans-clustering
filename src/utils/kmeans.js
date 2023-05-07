// Fungsi untuk menghitung jarak Euclidean antara dua titik
function calculateDistance(point1, point2) {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }
  return Math.sqrt(sum);
}

// Fungsi untuk menginisialisasi centroid awal secara acak
function initializeCentroids(data, k) {
  const centroids = [];
  const dataCopy = data.slice(); // Copy data agar tidak merusak data asli

  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * dataCopy.length);
    centroids.push(dataCopy.splice(randomIndex, 1)[0]);
  }

  return centroids;
}

// Fungsi untuk mengelompokkan data ke dalam kluster
function assignClusters(data, centroids) {
  const clusters = new Array(centroids.length).fill().map(() => []);

  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    let minDistance = Infinity;
    let closestCentroid = null;

    for (let j = 0; j < centroids.length; j++) {
      const centroid = centroids[j];
      const distance = calculateDistance(point, centroid);

      if (distance < minDistance) {
        minDistance = distance;
        closestCentroid = j;
      }
    }

    if (closestCentroid !== null) {
      clusters[closestCentroid].push(point);
    }
  }

  return clusters;
}

// Fungsi untuk menghitung posisi centroid baru
function updateCentroids(clusters) {
  const centroids = [];

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];

    if (cluster.length > 0) {
      const centroid = cluster.reduce((acc, curr) => {
        for (let j = 0; j < curr.length; j++) {
          acc[j] = (acc[j] || 0) + curr[j];
        }
        return acc;
      }, []);

      centroids.push(centroid.map((value) => value / cluster.length));
    } else {
      centroids.push([]);
    }
  }

  return centroids;
}

// Fungsi untuk melakukan k-means clustering
function kmeans(numericDataset, labeledDataset, k, maxIterations) {
  let centroids = initializeCentroids(numericDataset, k);
  let iteration = 0;
  const steps = [];

  while (iteration < maxIterations) {
    const clusters = assignClusters(numericDataset, centroids);
    const newCentroids = updateCentroids(clusters);
    let allDistances = [];

    let distances = [];
    for (let j = 0; j < numericDataset.length; j++) {
      const point = numericDataset[j];
      let minDistance = Infinity;
      let centroidDistances = [];

      for (let k = 0; k < newCentroids.length; k++) {
        const centroid = newCentroids[k];
        const distance = calculateDistance(point, centroid);

        if (distance < minDistance) {
          minDistance = distance;
        }
        centroidDistances.push(minDistance);
      }
      distances.push({
        data: labeledDataset[j][0],
        distances: centroidDistances,
      });
    }
    allDistances.push(distances);

    // Menggabungkan nama obat ke dalam data numerik dengan label kluster
    const labeledClusters = getLabelsFromClusters(labeledDataset, clusters);

    steps.push({
      iteration: iteration + 1,
      centroids: newCentroids,
      clusters: labeledClusters,
      euclideanDistances: allDistances,
    });

    // Cek konvergensi, jika centroid tidak berubah, hentikan iterasi
    if (JSON.stringify(newCentroids) === JSON.stringify(centroids)) {
      break;
    }

    centroids = newCentroids;
    iteration++;
  }

  return {
    centroids,
    clusters: assignClusters(numericDataset, centroids),
    steps,
  };
}

function getLabelsFromClusters(data, clusters) {
  const labels = [];

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    const clusterLabels = [];

    for (let j = 0; j < cluster.length; j++) {
      const index = data.findIndex((d) => {
        return JSON.stringify(d.slice(1)) === JSON.stringify(cluster[j]);
      });
      if (index !== -1) {
        clusterLabels.push(data[index][0]);
      }
    }

    labels.push({
      cluster: i + 1,
      data: clusterLabels,
    });
  }

  return labels;
}

function kmeansClustering(dataset, k, maxIterations = 100) {
  const numericDataset = dataset.map((item) => item.slice(1).map(Number));

  // Terapkan k-means clustering
  const { steps, clusters } = kmeans(numericDataset, dataset, k, maxIterations);

  // Menggabungkan nama obat ke dalam data numerik dengan label kluster
  const results = getLabelsFromClusters(dataset, clusters);

  return {
    results,
    steps,
  };
}
export { kmeansClustering };
