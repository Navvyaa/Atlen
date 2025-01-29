
import Navbar from "../components/Navbar";
import Explore from "../components/landingScreens/Explore";

export default function Home() {

  return (
    
    <section className="h-full md:w-full bg-white">
       <div className="flex space-y-2 sticky w-full top-0 z-50">
                    <Navbar />
                </div>
      <Explore />
      
    </section>

  );
}
