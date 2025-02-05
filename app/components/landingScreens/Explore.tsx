"use client"
import { useModal } from "@/app/context/ModalContext";
import InputComponent from "../ui/InputComponent";
import { useState,useEffect } from "react";
import { Skeleton } from "@mui/material";

interface exploreProps{
    mode?:"default"|"loggedIn";
}

const Explore: React.FC<exploreProps> = ({mode="default"}) => {
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

  // Simulate data fetching delay
  useEffect(()=>{
    setTimeout(()=>{
        setLoading(false);
    })
  },[]);
    const { isModalOpen, openModal, closeModal } = useModal();
    const destinations = [
        { name: "Paradise Beach", price: "$450.99", location: "Paris, France", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$620.75", location: "Tokyo, Japan", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$550.16", location: "Rome, Italy", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$710.50", location: "New York, USA", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
    ];


    return (
        // <div>Explore</div>
        <div className={isModalOpen ? "blur-background " : ""}>
            <section className="bg-white m-1 h-full  pb-12">
                <section className="sm:w-[600px] mx-auto flex flex-col justify-center items-center py-8 p-2   lg:py-10 ">
                    <div className="text-center pb-8 lg:pb-10 text-black text-3xl sm:text-5xl font-semibold ">Start your journey here.</div>
                    <div className="w-full p-2 relative">
                        <img src="/search.svg"
                            alt=""
                            className="absolute left-6 bottom-9" />
                        <input type="text"
                            className=" text-sm font-normal z-10 mb-4 p-3 pl-12 border rounded-2xl border-black w-full outline-none"
                            placeholder="Search any place, restaurants.."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center flex-row flex-wrap text-sm sm:text-md font-medium  gap-2 lg:gap-3" >
                        <button className="border border-gray-400 flex gap-4 rounded-2xl p-2 px-4 ">
                            <img src="/hotel.svg" alt="" />
                            Hotels and Unique Stays
                        </button>
                        <button className="border border-gray-400 flex gap-2 rounded-2xl p-2 px-4">
                            <img src="/restraunt.svg" alt="" />
                            Restraunts and cafe
                        </button>
                        {mode==="loggedIn" && (
                            <button className="border border-gray-400 flex gap-2 rounded-2xl p-2 px-4">
                                    <img src="/flight.svg" alt="" />
                                    Flights
                            </button>
                        )

                        }
                    </div>
                    <div className="text-center py-10 text-black text-xl lg:text-2xl  font-semibold ">Or Start with these popular picks</div>
                    </section>
                    {/* <section className="w-full  flex justify-center sm:pb-12"> */}

                    <div className="flex mx-auto pb-12 sm:gap-8 gap-2 sm:p-2 flex-wrap justify-center items-start w-full">
                        {loading?
                        
                            Array.from({length:4}).map((_,index)=>(
                                <div key={index} className="bg-white shadow-xl rounded-xl h-[300px] sm:w-52 w-44 m-2">
              <Skeleton variant="rectangular" width="98%" height="60%" className="rounded-xl mx-auto" />
              <div className="flex flex-col justify-start items-center gap-4 m-4 pb-6">
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="50%" height={25} />
                <Skeleton variant="text" width="60%" height={20} />
              </div>
            </div>
                            ))
                    :
                        destinations.map((destination,index)=>(
                            <div key={index} className="bg-white shadow-xl rounded-xl h-[300px] sm:w-52 w-44  m-2">
                                <img src={destination.img} alt=""  className="object-cover h-[60%] w-[98%] rounded-xl mx-auto" />
                                <div className="flex flex-col justify-start items-center gap-4 m-4 pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <div className="text-black text-xl font-bold w-44 text-center sm:text-left text-ellipsis">{destination.name}</div>
                <div className="text-[#f85e9f] px-3 text-xl font-bold">{destination.price}</div>
              </div>
              <div className="text-black text-md my-1 w-full text-center sm:text-left font-normal">{destination.location}</div>
            </div>
          
                            </div>
                        ))
};
                    </div>   

                    <div className="flex py-3 justify-center   ">
                            <button className="font-semibold text-2xl flex items-center">
                                <span>Explore More</span>
                                <img src="/arrow.svg" className="px-2" alt="" />
                            </button>
                        </div>
                    {/* </section> */}
                
            </section>
        </div>
    );
};

export default Explore;