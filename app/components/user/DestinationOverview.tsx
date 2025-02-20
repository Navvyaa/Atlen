"use client";

import ButtonComponent from "../ui/ButtonComponent";
import ServiceButton from "../ui/ServiceButton";
import  React, {useState } from "react";
const DestinationOverview = () => {
    const [activeButton, setActiveButton] = useState<string>('');

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



        </section>
    );
};

export default DestinationOverview;