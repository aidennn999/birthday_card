import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
 title: "Selamat Ulang Tahun Sayangku",
 description: "Ucapan spesial untuk hari spesialmu",
};

export default function RootLayout({children}) {
 return (
  <html lang="id">
   <body className={inter.className}>{children}</body>
  </html>
 );
}
