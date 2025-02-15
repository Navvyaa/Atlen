
import { Suspense } from 'react';
import Loading from '../components/ui/Loading';
import ClientDashboard from "../components/user/ClientDashboard";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';




export default async function Page() {
  const cookieStore =  await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    redirect('/');
  }

  return (
    <div className='w-full h-full relative'>
     
      
      <Suspense fallback={<Loading open={true} title="Loading" subtitle="" />}>
      {/* <div className="flex space-y-2 sticky w-full top-0 z-50">
                    <Navbar mode='loggedIn'/>
                </div> */}
        <ClientDashboard />
      </Suspense>
    </div>
  );
}
