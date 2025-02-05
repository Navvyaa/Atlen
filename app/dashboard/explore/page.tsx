import { Suspense } from 'react';
import Loading from '../../components/ui/Loading';
import Explore from '@/app/components/landingScreens/Explore';

const page = () => {
  return (

    <Suspense fallback={<Loading  open={true} title="Loading" subtitle="" />}>
      {/* <div className="sticky z-1000 w-full ">
        <Navbar mode="loggedIn"/>
      </div> */}
    <Explore  mode='loggedIn'/>
    </Suspense>
  )
}

export default page