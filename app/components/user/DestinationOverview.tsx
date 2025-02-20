"use client";

import ButtonComponent from "../ui/ButtonComponent";
import ServiceButton from "../ui/ServiceButton";
import  React, {useState } from "react";

interface DestinationOverviewProps {
    country: string;
}

const DestinationOverview:React.FC <DestinationOverviewProps> = ({country}) => {
    const [activeButton, setActiveButton] = useState<string>('');
    const topDestinations = [
        {img: '/rectangle.svg', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        // {img: '/France.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Japan.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Japan.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Sri Lanka.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        // {img: '/Finland.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Singapore.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Singapore.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Singapore.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
        {img: '/Singapore.png', name: 'Male',text:'Check out Atoll Transfer, Hukuru Miskiiy Mosque, and more'},
       
    ];
    return (
        <section className="w-[98%] mx-auto lg:w-[96%] h-full mt-6 relative">
            <div className="relative h-[300px] ">
                {/* <img src="" alt="" /> */}
                <div className="w-full bg-gray-200 rounded-2xl h-full"></div>
                <div className="absolute bottom-5 right-4">
                    <ButtonComponent sx={{ py: 1, px: 4, fontSize: '18px', fontWeight: 'regular' }}>
                        Start Planning
                    </ButtonComponent>
                </div>
                
            </div>
            <div className="flex gap-5 my-3">
                    <ServiceButton 
                    icon="/restraunt.svg" 
                    text="Where to eat"
                    onClick={() => setActiveButton('eat')}
                    isActive={activeButton === 'eat'}
                    />
                    <ServiceButton 
                    icon="/hotel.svg" 
                    text="Where to stay"
                    onClick={()=> setActiveButton('stay')}
                    isActive={activeButton === 'stay'}
                    />
                  
                </div>

            <h1 className="py-4 px-3 text-2xl font-semibold mt-6">Top Destinations in {country}</h1>
            <div className="lg:flex hidden flex-wrap gap-5 my-5   items-start justify-around">
                {topDestinations.map((destination, index) => (
                    // (index < 6 || window.innerWidth >= 1024) && 
                    <div key={index} className="w-[295px] min-h-[300px] bg-white border border-gray-300 rounded-2xl mx-3 my-3">
                        <img src={destination.img} alt={destination.name} className="w-full h-[200px] object-cover rounded-t-2xl" />
                        <div className="p-3">
                            <h2 className="text-xl font-semibold px-2">{destination.name}</h2>
                            <p className="text-md p-2">{destination.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DestinationOverview;