
import { Suspense } from 'react';
import Loading from '../components/ui/Loading';
import ClientDashboard from "../components/user/ClientDashboard";
import Navbar from '../components/Navbar';



export default function Page() {
  // const cookieStore =  cookies();
  // const accessToken =  getCookies();

  // if (!accessToken) {
  //   redirect('/');
  // }

  return (
    <div className='w-full h-full relative'>
      {/* <Navbar mode="loggedIn" /> */}
      
      <Suspense fallback={<Loading open={true} title="Loading" subtitle="" />}>
      {/* <div className="flex space-y-2 sticky w-full top-0 z-50">
                    <Navbar mode='loggedIn'/>
                </div> */}
        <ClientDashboard />
      </Suspense>
    </div>
  );
}
