"use client"

import LoginModal from "../auth/LoginModal";
import Footer from "../Footer";
import Navbar from "../Navbar";
import ButtonComponent from "../ui/ButtonComponent";
import { useModal } from '@/app/context/ModalContext';

const HomeScreen: React.FC = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const destinations = [
        { name: "Paris", price: "$450.99", location: "Paris, France", img: "/rectangle.svg" },
        { name: "Tokyo", price: "$620.75", location: "Tokyo, Japan", img: "/rectangle.svg" },
        { name: "Rome", price: "$550.16", location: "Rome, Italy", img: "/rectangle.svg" },
        { name: "New York", price: "$710.50", location: "New York, USA", img: "/rectangle.svg" },
        { name: "London", price: "$500.25", location: "London, UK", img: "/rectangle.svg" },
      ];
    return (
        <div className={isModalOpen ? 'blur-background ' : ''}>

            <section className="h-full md:w-full bg-white">
               
                {/* HERO SECTION */}
                <section
                    className="h-full w-full bg-[url('/bg-hero.svg')] bg-fill bg-no-repeat bg-center relative"
                >
                    <section className="h-max w-full lg:pl-16 md:pt-8  bg-[#EDF2F4] relative lg:flex-row flex-col flex md:justify-between ">
                        <div className="order-2 lg:order-1 text-center lg:text-left ">

                            <div className="relative lg:block hidden mt-4">
                                <img src="/SphereHero.svg" className="absolute  left-12 lg:left-48 top-3 lg:top-[-16] z-0 " alt="" />
                                <div className="h-14 relative top-12 left-4 z-10 px-8 py-4 bg-white rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.07)] justify-start items-center gap-4 inline-flex">
                                    <div className="text-primary text-sm font-bold ">Explore the world!</div>
                                    <div className="w-6 h-6 relative  overflow-hidden" >
                                        <img src="/work 1.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:hidden flex absolute z-0 items-center w-full justify-center mt-4">
                                <img src="/header-mob.svg" alt="" />
                            </div>
                            <div className="lg:text-7xl text-6xl lg:text-left text-center z-20 lg:static relative mt-24 font-bold leading-42"> Travel <span className="text-primary">top</span> <br /> <span className="text-primary">destinations</span> <br /> of the world</div>
                            <div className="text-[#888888] text-lg  font-semibold py-12 leading-7 w-full relative ">Effortlessly plan trips, track budgets, and explore destinations tailored to you.</div>
                            <div className="flex gap-4 lg:text-left justify-center lg:justify-start text-center mb-6">

                                <ButtonComponent onClick={openModal} sx={{ color: 'white', py: 3, px: 4, fontSize: '18px', fontWeight: 'bold' }}>Start Planning</ButtonComponent>
                                <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
                                <div className="lg:block hidden">
                                    <ButtonComponent variant="outlined" sx={{
                                        backgroundColor: 'transparent', borderColor: 'var(--primary-color)', color: 'var(--primary-color)', py: 3, px: 8, fontSize: '18px', fontWeight: 'bold', '&:hover': {
                                            backgroundColor: 'none',
                                        },
                                    }}>Explore Now</ButtonComponent>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 order-1  hidden lg:block lg:order-2"> <img src="/Hero.svg" alt="" /></div>
                    </section>

                    {/* FEATURE SECTION */}
                    <section className="w-full bg-[#EDF2F4] relative  flex flex-col  justify-center  py-10">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <img src="/mapbase.svg" alt="" className=" opacity-100" />
                        </div>
                        <div className="relative z-0 lg:pl-16 pl-4">
                            {/* <div className="h-8 px-5 py-1.5 bg-white rounded-lg justify-center items-center gap-2.5 inline-flex overflow-hidden mb-4">
                                <div className="text-black text-sm font-semibold leading-tight">
                                    FEATURES
                                </div>
                            </div> */}
                            <div className="flex items-center mt-8 lg:my-4">
                                <img src="/line1.svg" alt="" className="m-2" />
                                <span className="text-[#1e344f] ml-2 lg:text-7xl text-5xl  font-semibold">Why Choose Atlen?</span>
                            </div>
                            <ButtonComponent onClick={openModal} sx={{ color: 'white', p: 2, fontSize: '18px', fontWeight: 'bold', mt: '30px' }}>Start Your Journey</ButtonComponent>
                            <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
                        </div>
                    </section>



                    <div className="flex mb-10 w-full lg:w-[1000px] mx-auto lg:flex-row flex-col justify-center 2xl:justify-around items-center lg:gap-12 gap-6 lg:pt-12 lg:h-[600px] z-50 pb-40 lg:pb-20">
                        <div className="bg-white border border-black lg:left-10 flex flex-col justify-end lg:items-center rounded-2xl w-72 z-40 shadow-lg lg:h-100 lg:w-72 text-center">

                            <div className="flex flex-col m-10 justify-start items-center relative ">
                                <img src="/sphere3.svg" className="absolute lg:block hidden top-[-80px] left-[-100px] z-3" alt="" />
                                <img src="/vector1.svg" className="absolute lg:top-[-80px] hidden lg:block lg:left-40 z-30" alt="" />
                                <img src="/group-82.svg" className="absolute lg:hidden top-72  z-30" alt="" />
                                <img src="/TripManager.svg" alt="" /> 
                                <div className="font-semibold my-3 text-lg leading-snug">Trip Manager with Budget Insights</div>
                                <div className="text-center my-3 text-black text-md font-normal">Organize your trips and track your spending effortlessly. View upcoming, ongoing, and past trips with real-time budget tracking and detailed expense breakdowns.</div>
                            </div>
 
                        </div>
                        <div className="bg-white border border-black   lg:flex flex-col justify-start items-center w-72 rounded-2xl shadow-lg lg:h-100 lg:w-72 text-center lg:mt-[-200px] relative">
                                    <img src="/group-82.svg" className="absolute lg:block hidden top-20 left-48 z-30" alt="" />
                            <div className="flex flex-col m-10 justify-center items-center">
                                <img src="/Iterniary.svg" alt="" />
                                <div className="font-semibold my-3 text-lg leading-snug">Itinerary Planning</div>
                                <div className="text-center my-3 text-black text-md font-normal">Customize your day-to-day schedule with ease. Plan activities, add stops, and adjust on the go to create a perfect travel itinerary tailored to your needs</div>
                            </div>
                        </div>
                        <div className="bg-white border border-black   lg:flex flex-col justify-end items-center w-72 rounded-2xl shadow-lg lg:h-100 lg:w-72 text-center relative z-20">
                            <img src="/sphere2.svg" className="absolute hidden lg:block z-12 top-[-120px] right-[-80px]  " alt="" />
                            <div className="flex flex-col m-10 justify-center items-center">
                                <img src="/SmartPacking.svg" alt="" />
                                <div className="font-semibold my-3 text-lg leading-snug">Smart Packing &<br /> Saved Spots</div>
                                <div className="text-black my-3 text-md text-base font-normal">Stay prepared and inspired! Create tailored packing lists for every trip and save your favorite destinations, cafes, and attractions to explore effortlessly later</div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* EXPLORE */}
                <section className="w-full my-4 relative items-center flex flex-col  justify-center  lg:py-4">
                    {/* <div className="absolute bottom-0 w-[80%] h-[30%] bg-gradient-to-t from-gray-200 via-gray-100 to-transparent blur-sm   "></div> */}
                    <div className="absolute bottom-0 w-[80%] h-[30%] mx-auto left-0 right-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(229,231,235,1)_0%,_rgba(229,231,235,0)_100%)] blur-lg"></div>

                    <div className="relative">
                        <div className=" text-center text-[#1e344f] lg:p-0 px-4 text-5xl lg:text-7xl font-semibold ">
                            Top Destinations to Explore
                        </div>
                        <div className=" text-[#888888] text-center mt-4 mb-12 text-lg font-medium ">Top-Rated Destinations to Inspire Your Wanderlust</div>
                        <div className="flex  justify-center items-center flex-col lg:flex-row gap-10">

                            {["Paradise Beach, Bantayan Island", "Parabise Beach, Banayan Island", "Parzxis, France"].map((destination, index) => (

                                <div key={index} className="bg-white  rounded-xl shadow lg:h-[500px] w-80 relative ">
                                    {index === 0 && <img src="/sphere2.svg" className="absolute w-6 h-6 top-[-20px] left-[-30px]" alt="" />}
                                    {index === 2 && <img src="/sphere3.svg" className=" lg:absolute hidden lg:block bottom-[-60px] right-[-50px]" alt="" />}
                                    <div className="h-[70%]">
                                        <img src="/rectangle.svg" className="object-cover w-full" alt="" />
                                    </div>
                                    <div className="h-[30%]">
                                        <div className="flex-col justify-start items-center gap-4 m-4 pb-6 ">
                                            <div className="justify-between flex flex-row items-center ">
                                                <div className="grow shrink basis-0 text-black text-2xl font-bold">{destination}</div>
                                                <div className="text-[#f85e9f] px-3 text-2xl font-bold">$550.16</div>
                                            </div>
                                            <div className="text-black text-lg mt-4 font-normal">Rome, Italy</div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>
                        <div className="flex py-3 justify-center  my-5 ">
                            <button className="font-semibold text-2xl flex items-center">
                                <span>Explore All</span>
                                <img src="/arrow.svg" className="px-2" alt="" />
                            </button>
                        </div>

                    </div>
                </section>

                {/* TESTIMONIAL */}

                <section className="w-full bg-white relative overflow-hidden flex flex-col lg:p-0 justify-center  pt-10">
                    <div className="relative z-40 lg:pl-16 pl-4">
                        <div className="flex items-center  my-4">
                            <img src="/line1.svg" alt="" className="m-2 lg:h-24" />
                            <span className="text-[#1e344f] relative z-40 ml-2 text-5xl lg:text-7xl font-semibold">What Travellers Say?</span>
                        </div>
                        <div className="relative z-40">
                            <ButtonComponent onClick={openModal} sx={{ color: 'white', p: 2, fontSize: '18px', fontWeight: 'bold', mt: '30px' }}>Share Your Experience</ButtonComponent>
                        </div>
                        <LoginModal open={isModalOpen} onClose={closeModal} step={1} />

                    </div>
                    <div className="w-full lg:w-[1190px] sm:w[800px] h-[550px] sm:h-[600px] relative">
                        <div className="absolute inset-0 flex flex-row">
                            <img src="/Ring 1.svg" className="relative sm:bottom-36 left-30 bottom-20 sm:left-32" alt="" />
                            <img src="/Ring 2.svg" className="relative right-40 sm:bottom-10 sm:right-20" alt="" />
                            {/* <img src="/Ring 2.svg" className="relative lg:bottom-10 lg:right-20" alt="" /> */}
                        </div>
                        <div className="relative z-10  ">
                            <img src="/IMG1.svg" className="sm:w-40 w-24 sm:top-32 absolute top-40 left-24 lg:top-20 lg:left-60 " alt="" />
                            <div className="bg-white w-max sm:left-40 p-2 sm:p-3 border text-md border-black absolute left-32 lg:left-80 top-52 lg:top-40 rounded-[32px]">Budgeting my trip was so <br />easy with Atlen</div>

                            {/* </div> */}
                            {/* <div className="relative z-20"> */}

                            <img src="/IMG2.svg" className="absolute sm:w-40 w-24 sm:bottom-28 right-10 lg:right-96 lg:top-48" alt="" />
                            <div className="bg-white sm:w-[300px] w-[200px] p-2 right-15 top-10  sm:p-3 absolute lg:right-32 lg:top-60 rounded-[32px] right-24 border text-md border-black ">Seasonal suggestions made my trip perfect</div>
                            {/* </div> */}

                            <img src="/IMG3.svg" className="absolute sm:top-72 top-72 right-0 sm:right-20 sm:w-40 w-24 lg:right-40 lg:top-6" alt="" />
                            <div className="bg-white w-max  absolute lg:top-28 right-20 lg:right-60 top-80 sm:top-96 p-2  sm:p-3 sm:right-40 rounded-[32px] border text-md border-black ">Atlen made trip planning effortless</div>

                            {/* <div className="relative z-20"> */}

                            <img src="/IMG4.svg" className=" sm:w-40 w-24 relative left-20 top-96 lg:left-96 lg:top-96" alt="" />
                            <div className="bg-white  w-max  lg:p-3 relative p-2 top-[365px] left-24 lg:left-36 lg:ml-96 lg:top-72 rounded-[32px] border text-md border-black ">Organizing my itinerary  was a <br />breeze!</div>
                        </div>


                    </div>
                </section>
                {/* FOOTER */}
                <section id="about" className="w-full ">
                    <Footer />
                </section>
            </section>
        </div>

    );
}
export default HomeScreen;