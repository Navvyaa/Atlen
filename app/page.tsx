import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import { useModal } from '@/app/context/ModalContext';
import HomeScreen from "./components/landingScreens/HomeScreen";
export default function Home() {
  return (
    <section className="h-full md:w-full bg-white">
       <div className="flex space-y-2 sticky w-full top-0 z-50">
                    <Navbar />
                </div>
      <HomeScreen />
    </section>

  );
}
