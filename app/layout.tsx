import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import { Urbanist } from 'next/font/google'; 

export const metadata: Metadata = {
  title: "Trippin",
  description: "Plan your next trip with ease",
};



const urbanist = Urbanist({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <body className={urbanist.className}>
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
