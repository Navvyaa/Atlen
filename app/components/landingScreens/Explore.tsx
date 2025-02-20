"use client"
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Footer from "../Footer";
import ServiceButton from "../ui/ServiceButton";
import { useRouter } from "next/navigation";

interface exploreProps {
    mode?: "default" | "loggedIn";
}

const Explore: React.FC<exploreProps> = ({ mode = "default" }) => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    const handleCountryClick = (country: string) => {
        const formattedCountry = country.replace(/\s+/g, '');
        router.push(`/dashboard/explore/${formattedCountry}`);
    }

    // Simulate data fetching delay
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        })
    }, []);
    const services = [
        { icon: '/hotel.svg', text: 'Hotels and Unique Stays' },
        { icon: '/restraunt.svg', text: 'Restaurants and Cafe' },
        { icon: '/flight.svg', text: 'Flights' }
    ];

    const destinations = [
        { name: "Paradise Beach", price: "$450.99", location: "Paris, France", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$620.75", location: "Tokyo, Japan", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$550.16", location: "Rome, Italy", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$710.50", location: "New York, USA", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
        { name: "Paradise Beach", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
    ];
    const europe = [
        { img: "/Finland.png", name: "Finland" },
        { img: "/Austria.png", name: "Austria" },
        { img: "/SwitzerLand.png", name: "SwitzerLand" },
        { img: "/Italy.png", name: "Italy" },
        { img: "/France.png", name: "France" },
        { img: "/Turkey.png", name: "Turkey" },
        { img: "/Spain.png", name: "Spain" },
    ];
    const SouthEastAsian = [
        { img: "/Phillipines.png", name: "Phillipines", text: "The Pearl of the Orient" },
        { img: "/Singapore.png", name: "Singapore", text: "The lion city" },
        { img: "/Sri Lanka.png", name: "Sri Lanka", text: "Fall in love with" },
        { img: "/Malaysia.png", name: "Sri Lanka", text: "Fall in love with" },
        { img: "/Japan.png", name: "Japan", text: "Land of Rising Sun" },

    ]
    const DestinationGuides = [
        { img: "/DG1.svg", name: "Maldives", text: "The Pearl of the Orient" },
        { img: "/DG2.svg", name: "Singapore", text: "The Pearl of the Orient" },
        { img: "/DG3.svg", name: "Sri Lanka", text: "Fall in love with" },
        { img: "/DG4.svg", name: "Sri Lanka", text: "Fall in love with" },
        { img: "/DG5.svg", name: "Japan", text: "Land of Rising Sun" },

    ]


    return (
        // <div>Explore</div>
        <div className="w-full no-scrollbar overflow-hidden">
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
                    <div className="flex justify-center flex-row flex-wrap text-sm sm:text-md font-medium gap-2 lg:gap-3">
                        {services.map((service, index) => (
                            <ServiceButton
                                key={index}
                                icon={service.icon}
                                text={service.text}
                                // onClick={() => {
                                  
                                // }}
                            />
                        ))}
                    </div>
                    <div className="text-center py-10 text-black text-xl lg:text-2xl  font-semibold ">Or Start with these popular picks</div>
                </section>
                {/* <section className="w-full  flex justify-center sm:pb-12"> */}
                {mode === "default" &&
                    <>
                        <div className="flex mx-auto pb-12 sm:gap-8 gap-2 sm:p-2 flex-wrap justify-center items-start w-full">
                            {loading ?

                                Array.from({ length: 4 }).map((_, index) => (
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
                                destinations.map((destination, index) => (
                                    <div key={index} className="bg-white shadow-xl rounded-xl h-[300px] sm:w-52 w-44  m-2">
                                        <img src={destination.img} alt="" className="object-cover h-[60%] w-[98%] rounded-xl mx-auto" />
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
                    </>
                }
                {
                    mode === "loggedIn" &&
                    <>
                        <div className="flex flex-row mx-4 lg:gap-10 lg:ml-12 gap-6 no-scrollbar  overflow-x-auto h-[300px] ">
                            {destinations.map((destination, index) => (
                                <div key={index}
                                    onClick={() => handleCountryClick(destination.name)}
                                    className="w-[210px] bg-white shadow-lg border border-gray-400 h-[270px] rounded-3xl relative flex-shrink-0 cursor-pointer">
                                    <img src={destination.img} className="object-cover w-full h-[60%] rounded-t-3xl" alt="destination" />
                                    <div className="flex flex-col p-4">
                                        <p className="font-semibold text-xl">{destination.name}</p>
                                        <p className="font-normal text-lg">{destination.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="font-semibold text-2xl w-full lg:ml-12 ml-6 my-8">Explore Europe</p>
                        <div className="flex flex-row mx-4 gap-16 ml-8 lg:ml-12 no-scrollbar overflow-x-auto h-[250px] scrollbar-hide">
                            {
                                europe.map((destination, index) => (
                                    <div key={index}
                                        onClick={() => handleCountryClick(destination.name)}
                                        className="rounded-full w-[140px] flex-shrink-0 cursor-pointer">
                                        <div className="flex flex-col">
                                            <img src={destination.img} alt="destination" className="object-cover rounded-full w-full " />
                                            <p className="font-semibold mt-4  text-center text-ellipsis text-lg">{destination.name}</p>
                                        </div>
                                    </div>
                                ))}

                        </div>
                        <p className="font-semibold text-2xl lg:ml-10 ml-6 my-8">Top Destinations</p>
                        <div className="flex flex-row mx-4 gap-10 no-scrollbar overflow-x-auto ">
                            {
                                destinations.map((destination, index) => (
                                    <div key={index}
                                        onClick={() => handleCountryClick(destination.name)}
                                        className="rounded-2xl w-[210px] h-[280px] flex-shrink-0 cursor-pointer ">
                                        <div className="relative">
                                            <img src={destination.img} alt="destination" className="object-cover rounded-2xl w-full " />
                                            <p className=" left-4 text-white text-ellipsis text-lg absolute bottom-2 mx-auto">{destination.name}</p>
                                        </div>
                                    </div>
                                ))}

                        </div>

                        <p className="font-semibold text-2xl w-full ml-8  my-8 lg:block hidden">Explorations Far Away</p>
                        <div

                            className="flex flex-row lg:w-full px-6 gap-5 no-scrollbar w-[1000px]   h-[550px] overflow-x-scroll ">
                            <div className="flex flex-col gap-5 w-1/3 ">
                                <div className="w-full relative  rounded-xl h-1/2">
                                    <img src="/rectangle.svg" alt="" className="rounded-xl w-full h-full relative object-cover" />
                                    <p className="font-semibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>
                                </div>
                                <div className="flex flex-row gap-5 w-full h-1/2">
                                    <div className=" relative w-1/2 h-full rouned-xl">
                                        <img src="/rectangle.svg" alt="" className="rounded-xl h-full w-full object-cover relative" />
                                        <p className="font-smibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>

                                    </div>
                                    <div className=" relative h-full w-1/2 rouned-xl">
                                        <img src="/rectangle.svg" alt="" className="rounded-xl h-full w-full object-cover relative" />
                                        <p className="font-semibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>

                                    </div>
                                </div>
                            </div>

                            <div className=" w-1/3 relative rouned-xl">
                                <img src="/rectangle.svg" alt="" className="rounded-xl h-full w-full relative object-cover" />
                                <p className="font-semibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>

                            </div>
                            <div className="flex flex-col gap-5 w-1/3 h-full">
                                <div className="w-full relative  rounded-xl h-1/2">
                                    <img src="/rectangle.svg" alt="" className="rounded-xl w-full h-full relative object-cover" />
                                    <p className="font-semibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>
                                </div>
                                <div className="w-full relative   rounded-xl h-[46%]">
                                    <img src="/rectangle.svg" alt="" className="rounded-xl w-full h-full relative object-cover" />
                                    <p className="font-semibold text-lg text-black absolute bottom-2 left-4">Paradise Beach</p>
                                </div>

                            </div>
                        </div>
                        <p className="font-semibold text-2xl w-full  ml-6 lg:ml-12  mt-12">South East Asian Vacations</p>
                        <div className="flex flex-row gap-8 ml-4 lg:ml-10 my-3 overflow-x-auto no-scrollbar ">
                            {SouthEastAsian.map((place, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCountryClick(place.name)}
                                    className="w-[250px] h-full my-4 relative rounded-2xl flex-shrink-0 cursor-pointer"
                                >
                                    <img src={place.img} alt="place" className="object-cover w-full rounded-2xl" />
                                    <div className="absolute bottom-2 w-full text-center">
                                        <p className=" mx-auto  font-semibold text-md text-white">{place.text}</p>
                                        <p className="mx-auto text-2xl left-2 p-8 mb-4 font-bold text-white">{place.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="font-semibold text-2xl w-full lg:ml-12 ml-6 my-8 ">Destination Guides</p>
                        <div className="flex flex-row gap-8 ml-4 lg:ml-10 my-3 overflow-x-auto no-scrollbar ">
                            {DestinationGuides.map((place, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCountryClick(place.name)}
                                    className="w-[250px] h-full relative rounded-2xl flex-shrink-0 cursor-pointer"
                                >
                                    <img src={place.img} alt="place" className="object-cover w-full rounded-2xl" />
                                    <div className="absolute bottom-2 w-full text-center">
                                        <p className=" mx-auto p-3 font-semibold text-lg text-black">{place.text}</p>
                                        <p className="mx-auto text-3xl left-2 p-8 font-bold text-black">{place.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </>
                }
                {/* </section> */}
            </section>
            <section id="about" className="w-full ">
                <Footer />
            </section>
        </div>
    );
};

export default Explore;