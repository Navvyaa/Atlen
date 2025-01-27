"use client"
const footer: React.FC = () => {
    return (
        <section className="bg-[#FCF5F5] relative z-100 w-full inter  font-sans text-[#5B5F62] lg:p-16 lg:px-28">
            <div className="flex flex-row justify-between lg:p-2 p-8 items-center">
                <div className="flex justify-center items-center gap-4 flex-col">
                    <img src="/logo.svg" className="lg:w-32 w-24" alt="" />
                    <div className="lg:text-xl text-md"> Enjoy touring with Atlen</div>
                    <div className="flex flex-row gap-4 ">
                        <button className="hover:shadow-lg">
                            <img src="/fb.svg" className="w-10 " alt="" />
                        </button>
                        <button>
                            <img src="/insta.svg" className="w-10" alt="" />
                        </button>
                        <button>
                            <img src="/X.svg" className="w-10" alt="" />
                        </button>
                    </div>

                </div>
                <div className="flex   flex-row gap-24">
                    <div className="hidden lg:flex flex-col gap-2">
                        <div className="font-medium text-[#2D3134] text-xl">
                            Resources
                        </div>
                        <div className="text-md font-regular">
                            Download <br />
                            Help Center <br />
                            App Directory <br />
                            Guide Book
                        </div>
                    </div>
                    <div className="lg:flex  hidden flex-col gap-2">
                        <div className="font-medium text-[#2D3134] text-xl">
                            Travellers
                        </div>
                        <div className=" text-md font-regular">
                            Download <br />
                            Help Center <br />
                            App Directory <br />
                            Guide Book
                        </div>
                    </div>
                    <div className="lg:flex hidden flex-col gap-2">
                        <div className="font-medium text-[#2D3134] text-xl">
                            Company
                        </div>
                        <div className="text-md font-regular">
                            Download <br />
                            Help Center <br />
                            App Directory <br />
                            Guide Book
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-medium text-[#2D3134] text-lg">
                            Get App
                        </div>
                        <div className="text-md font-regular">
                            App Store <br/>
                            Google Play Store <br/>
                            
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default footer;