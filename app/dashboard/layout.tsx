// /app/dashboard/layout.tsx

import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
    title: "Atlen",
    description: "Your companion for effortless travel planning.",
  };

  
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full relative">
      {/* Add Navbar, Sidebar, or any persistent UI */}
      {/* <header className="p-4 bg-gray-800 text-white">Dashboard Header</header> */}
      <div className="sticky z-100 w-full ">
        <Navbar mode="loggedIn"/>
      </div>
      <main>{children}</main>
    </div>
  );
}
