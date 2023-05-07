import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clustering Data Obat",
  description:
    "ANALISA METODE K-MEANS CLUSTERING DALAM MENGELOMPOKKAN DATA OBAT DI POLIKLINIK MAPOLDA SUMATERA UTARA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
