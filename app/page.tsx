import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      {/* <h1 className="font-bold text-2xl">Trippin: Travel Planner</h1> */}
      <section className="h-screen w-screen ">
        <div className="flex space-y-2">
          <Navbar />
        </div>
      </section>
    </div>
  );
}
