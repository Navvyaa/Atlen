// /app/dashboard/layout.tsx

import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
    title: "Atlen",
    description: "Your companion for effortless travel planning.",
  };

  
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <div className="flex space-y-2 sticky w-full top-0 z-50">
                    <Navbar mode='loggedIn'/>
                </div>
      <main>{children}</main>
    </div>
  );
}
