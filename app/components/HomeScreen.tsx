"use client"

import LoginModal from "./auth/LoginModal";
import ButtonComponent from "./ui/ButtonComponent";
import { useModal } from '@/app/context/ModalContext';

const HomeScreen: React.FC = () => {
    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <div className={isModalOpen ? 'blur-background w-full' : 'w-full'}>
            <section className="h-screen md:w-full bg-white ">
                {/* HERO SECTION */}
                <section className="h-max w-full lg:pl-16 md:pt-8  bg-[#EDF2F4] relative lg:flex-row flex-col flex md:justify-between ">
                    <div className="order-2 lg:order-1 text-center lg:text-left ">

                        <div className="relative mt-4">
                            <img src="/SphereHero.svg" className="absolute left-48 top-[-16] z-0 " alt="" />
                            <div className="h-14 relative top-12 left-4 z-10 px-8 py-4 bg-white rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.07)] justify-start items-center gap-4 inline-flex">
                                <div className="text-primary text-sm font-bold ">Explore the world!</div>
                                <div className="w-6 h-6 relative  overflow-hidden" >
                                    <img src="/work 1.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-7xl lg:text-left  text-center mt-24 font-bold leading-42"> Travel <span className="text-primary">top</span> <br /> <span className="text-primary">destinations</span> <br /> of the world</div>
                        <div className="text-[#888888] text-lg font-semibold py-12 leading-7 w-full relative ">Effortlessly plan trips, track budgets, and explore destinations tailored to you.</div>
                        <div className="flex gap-4 lg:text-left text-center mb-6">

                            <ButtonComponent onClick={openModal} sx={{ color: 'white', py: 3, px: 4, fontSize: '18px', fontWeight: 'bold' }}>Start Planning</ButtonComponent>
                            <LoginModal open={isModalOpen} onClose={closeModal} step={1} />

                            <ButtonComponent variant="outlined" sx={{
                                backgroundColor: 'transparent', borderColor: 'var(--primary-color)', color: 'var(--primary-color)', py: 3, px: 8, fontSize: '18px', fontWeight: 'bold', '&:hover': {
                                    backgroundColor: 'none',
                                },
                            }}>Explore Now</ButtonComponent>
                        </div>
                    </div>
                    <div className="relative z-10 order-1 lg:order-2"> <img src="/Hero.svg" alt="" /></div>
                </section>

                {/* FEATURE SECTION */}
                <section className="w-full bg-[#EDF2F4] relative  flex flex-col  justify-center  py-10">
                    <div className="absolute inset-0 flex justify-center items-center">
                        <img src="/mapbase.svg" alt="" className=" opacity-100" />
                    </div>
                    <div className="relative z-0 lg:pl-16">
                        <div className="h-8 px-5 py-1.5 bg-white rounded-lg justify-center items-center gap-2.5 inline-flex overflow-hidden mb-4">
                            <div className="text-black text-sm font-semibold leading-tight">
                                FEATURES
                            </div>
                        </div>
                        <div className="flex items-center  my-4">
                            <img src="/line1.svg" alt="" className="m-2" />
                            <span className="text-[#1e344f] ml-2 text-7xl font-semibold">Why Choose Atlen?</span>
                        </div>
                        <ButtonComponent onClick={openModal} sx={{ color: 'white', p: 2, fontSize: '18px', fontWeight: 'bold', mt: '30px' }}>Start Your Journey</ButtonComponent>
                        <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
                    </div>


                </section>
                <div className="flex mb-10 w-full bg-[#EDF2F4] lg:flex-row flex-col justify-center 2xl:justify-around items-center lg:gap-16 gap-6 lg:pt-12 lg:h-[600px] z-10">
                    <div className="bg-white  flex flex-col justify-end items-center rounded-2xl shadow-lg lg:h-100 lg:w-72 text-center">

                        <div className="flex flex-col m-10 justify-start items-center relative">
                            <img src="/sphere3.svg" className="absolute top-[-80] left-[-100]" alt="" />
                            <img src="/TripManager.svg" alt="" />
                            <div className="font-semibold my-3 text-lg leading-snug">Trip Manager with Budget Insights</div>
                            <div className="text-center my-3 text-black text-md font-normal">Organize your trips and track your spending effortlessly. View upcoming, ongoing, and past trips with real-time budget tracking and detailed expense breakdowns.</div>
                        </div>

                    </div>
                    <div className="bg-white  flex flex-col justify-start items-center rounded-2xl shadow-lg lg:h-100 lg:w-72 text-center lg:mt-[-200px]">

                        <div className="flex flex-col m-10 justify-center items-center">
                            <img src="/Iterniary.svg" alt="" />
                            <div className="font-semibold my-3 text-lg leading-snug">Itinerary Planning</div>
                            <div className="text-center my-3 text-black text-md font-normal">Customize your day-to-day schedule with ease. Plan activities, add stops, and adjust on the go to create a perfect travel itinerary tailored to your needs</div>
                        </div>
                    </div>
                    <div className="bg-white  flex flex-col justify-end items-center rounded-2xl shadow-lg lg:h-100 lg:w-72 text-center relative z-20">
                        <img src="/sphere2.svg" className="absolute z-12 top-[-120] right-[-20]  " alt="" />
                        <div className="flex flex-col m-10 justify-center items-center">
                            <img src="/SmartPacking.svg" alt="" />
                            <div className="font-semibold my-3 text-lg leading-snug">Smart Packing &<br /> Saved Spots</div>
                            <div className="text-black my-3 text-md text-base font-normal">Stay prepared and inspired! Create tailored packing lists for every trip and save your favorite destinations, cafes, and attractions to explore effortlessly later</div>
                        </div>
                    </div>
                </div>
                {/* EXPLORE */}
                <section className="w-full my-4 relative items-center flex flex-col  justify-center  py-4">
                    <div className="relative">
                        <div className=" text-center text-[#1e344f] text-7xl font-semibold ">
                            Top Destinations to Explore
                        </div>
                        <div className=" text-[#888888] text-center mt-4 mb-12 text-lg font-medium ">Top-Rated Destinations to Inspire Your Wanderlust</div>
                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="bg-white rounded-xl shadow-lg h-120 w-72">
                                {/* <img src="" alt="" /> */}
                                {/* <div></div> */}
                            </div>
                            <div className="bg-white rounded-xl shadow-lg h-120 w-72"></div>
                            <div className="bg-white rounded-xl shadow-lg h-120 w-72"></div>
                        </div>
                    </div>
                </section>

            </section>
        </div>

    );
}
export default HomeScreen;