import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import ClientSessionProvider from "./components/ClientSessionProvider";
import { ModalProvider } from '@/app/context/ModalContext';
import { Urbanist } from 'next/font/google'; 
export const metadata: Metadata = {
  title: "Atlen",
  description: "Your companion for effortless travel planning.",
};
const urbanist = Urbanist({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={urbanist.className}>
      <AppRouterCacheProvider>
      <ModalProvider>
      <ClientSessionProvider >
        {children}
        </ClientSessionProvider>
        </ModalProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
