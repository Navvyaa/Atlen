import BackButton from "@/app/components/ui/BackButton";
import ButtonComponent from "@/app/components/ui/ButtonComponent";
import DestinationOverview from "@/app/components/user/DestinationOverview";
interface CountryPageProps {
  params: {
    country: string;
  };
}

const CountryDetails = ({ params }: CountryPageProps) => {
  const countryName = decodeURIComponent(params.country);

  return (
    <div className="w-full h-full mt-3 px-3">
      <div className=" flex relative flex-row  gap-4">
        <div className="">
      <BackButton />
      </div>
      <div className="pl-12 mt-4">
      <h1 className="text-3xl font-semibold ">Explore {countryName}</h1>
      
      </div>
      </div>
      
      <DestinationOverview country={countryName}/>

    </div>
  );
};

export default CountryDetails;