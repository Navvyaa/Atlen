import Navbar from "./components/Navbar";
import ButtonComponent from "./components/ui/ButtonComponent";
// import { useModal } from '@/app/context/ModalContext';
import HomeScreen from "./components/HomeScreen";
export default function Home() {
  return (
      <section className="h-screen md:w-full bg-white">
        <div className="flex space-y-2 sticky top-0 z-50">
          <Navbar />
        </div>
        
        <HomeScreen />
      </section>

  );
}
