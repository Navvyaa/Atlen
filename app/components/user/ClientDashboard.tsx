"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ButtonComponent from "../ui/ButtonComponent";
import Footer from '../Footer';
import Image from 'next/image';
import Link from 'next/link';

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (!accessToken) {
      console.log("No Access Token found");
      router.push('/');
    }
  }, [accessToken, router]);

  return (
    <div className="h-full w-full bg-white ">
      <section className="h-full w-full bg-[url('/bg-hero.svg')] bg-fill bg-no-repeat bg-center relative" >
        <section className="w-full bg-[#EDF2F4] lg:pl-16 md:pt-8   pb-4 relative lg:flex-row flex-col flex md:justify-between ">
          <div className="order-2 lg:order-1 text-center lg:text-left ">

            <div className="relative lg:block hidden mt-4">
              <Image src="/SphereHero.svg" className="absolute  left-12 lg:left-48 top-3 lg:top-[-16] z-0 " alt="" width={100} height={100} />
              <div className="h-14 relative top-12 left-4 z-10 px-8 py-4 bg-white rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.07)] justify-start items-center gap-4 inline-flex">
                <div className="text-primary text-sm font-bold ">Explore the world!</div>
                <div className="w-6 h-6 relative  overflow-hidden" >
                  <img src="/work 1.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="lg:hidden flex absolute z-0 items-center w-full justify-center mt-4">
              <Image width={400} height={400} src="/header-mob.svg" alt="" />
            </div>
            <div className="lg:text-7xl text-6xl lg:text-left text-center z-20 lg:static relative mt-24 font-bold leading-42"> Travel <span className="text-primary">top</span> <br /> <span className="text-primary">destinations</span> <br /> of the world</div>
            <div className="text-[#888888] text-lg  font-semibold py-12 leading-7 w-full relative ">Effortlessly plan trips, track budgets, and explore destinations tailored to you.</div>
            <div className="flex gap-4 lg:text-left justify-center lg:justify-start text-center mb-6">

              <ButtonComponent sx={{ color: 'white', py: 3, px: 3, fontSize: '20px', fontWeight: 'regular' }}>Create Trip</ButtonComponent>
              {/* <LoginModal open={isModalOpen} onClose={closeModal} step={1} /> */}
              <div className="lg:block hidden border border-primary rounded-[17px]">
                                    <ButtonComponent variant="outlined" onClick={() => {router.push("/dashboard/explore")}} sx={{
                                        backgroundColor: 'transparent', borderColor: 'var(--primary-color)', color: 'var(--primary-color)', py: 3, px: 8, fontSize: '18px', fontWeight: 'bold', '&:hover': {
                                            backgroundColor: 'none',
                                        },
                                    }}>Explore Now</ButtonComponent>
                                </div>
            </div>
          </div>
          <div className="relative z-10 order-1  hidden lg:block lg:order-2"> <img src="/Hero.svg" alt="" /></div>
          <div className="hidden lg:absolute inset-0 lg:flex justify-center items-end">
            <img src="/mapbase.svg" alt="" className=" opacity-90" />
          </div>
        </section>



        <section className="w-full my-4 bg-[#edf2f4] lg:bg-transparent relative items-center flex flex-col  justify-center  pt-24  lg:py-4 ">
          {/* <div className="absolute bottom-0 w-[80%] h-[30%] bg-gradient-to-t from-gray-200 via-gray-100 to-transparent blur-sm   "></div> */}
          <div className="absolute bottom-0 w-[80%] h-[30%] mx-auto left-0 right-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(229,231,235,1)_0%,_rgba(229,231,235,0)_100%)] blur-lg"></div>

          <div className="relative">
            <div className=" text-center text-[#1e344f] lg:p-0 px-4 text-5xl lg:text-7xl font-semibold ">
              Top Destinations to Explore
            </div>
            <div className=" text-[#888888] text-center mt-4 mb-12 text-lg font-medium ">Top-Rated Destinations to Inspire Your Wanderlust</div>
            <div className="flex  justify-center items-center flex-col lg:flex-row gap-10">

              {["Paradise Beach, Bantayan Island", "Parabise Beach, Banayan Island", "Paris, France"].map((destination, index) => (

                <div key={index} className="bg-white h-[380px] rounded-3xl shadow lg:h-[480px] w-80 relative ">
                  {index === 0 && <img src="/sphere2.svg" className="absolute w-6 h-6 top-[-20px] left-[-30px]" alt="" />}
                  {index === 2 && <img src="/sphere3.svg" className=" lg:absolute hidden lg:block bottom-[-60px] right-[-50px]" alt="" />}
                  <div className=" lg:h-[70%]">
                    <img src="/rectangle.svg" className="object-cover lg:h-auto h-[240px] rounded-lg w-full" alt="" />
                  </div>
                  <div className=" lg:h-[30%]">
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
                <span>
                  <Link href="/dashboard/explore" className=' decoration-none my-2 lg:m-1 p-2'>Explore All</Link></span>
                <Image width={24} height={24} src="/arrow.svg" className="px-1" alt="" />
              </button>
            </div>

          </div>
        </section>
      </section>


      <section className='w-full bg-white relative  flex flex-col  justify-center lg:py-4'>
      
        <div className="relative z-40 lg:pl-16 pl-4 pb-4">
          <div className="flex items-center  my-4">
            <Image width={12} height={12} src="/line1.svg" alt="" className='mx-2' />
            <span className="text-[#1e344f] relative z-40 ml-2 text-5xl lg:text-7xl font-semibold">Use AI to plan your trips</span>
          </div>
          <div className='my-8 '>
            <ButtonComponent sx={{ color: 'white', py: 3, px: 3, fontSize: '20px', fontWeight: 'regular' }}>Create Trip</ButtonComponent>
          </div>
          <div className='flex flex-row gap-6 items-start overflow-x-auto justify-center pb-4'>

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='w-[280px] h-[280px] rounded-2xl relative flex-shrink-0'>
                <Image src="/aiSymbol.svg" width={30} height={30} className='absolute top-5 left-5' alt="" />
                <img src="/rectangle.svg" alt="" className='w-full h-full rounded-3xl ' />
              </div>
            ))}

          </div>
        </div>

      </section>
      <div id='about'>
        <Footer />
      </div>
    </div>
  );
};

export default ClientDashboard;