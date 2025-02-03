
import { Suspense } from 'react';
import Loading from '../components/ui/Loading';
import ClientDashboard from "../components/ClientDashboard";



export default function Page() {
  // const cookieStore =  cookies();
  // const accessToken =  getCookies();

  // if (!accessToken) {
  //   redirect('/');
  // }

  return (
    <div className=' overflow-x-hidden'>
      {/* <Navbar mode="loggedIn" /> */}
      <Suspense fallback={<Loading  open={true} title="Loading" subtitle="" />}>
      <ClientDashboard  />
      </Suspense>
    </div>
  );
}
