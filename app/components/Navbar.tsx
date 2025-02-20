"use client";
import React, { useState,useRef,useEffect } from 'react';
import { useModal } from '@/app/context/ModalContext';
import ButtonComponent from './ui/ButtonComponent';
import LoginModal from './auth/LoginModal';
import Link from 'next/link';
import { logout } from '@/app/features/auth/slices/authSlice';
import { AppDispatch } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import CreateTrip from './user/CreateTrip';
interface NavbarProps {
  mode?:"loggedIn" | "default";
}

const Navbar: React.FC <NavbarProps>= ({mode="default"}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isTripMenuOpen,setIsTripMenuOpen]=useState<boolean>(false);
  const [isCreateTripOpen,setIsCreateTripOpen]=useState<boolean>(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsTripMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogOut = () => {
    dispatch(logout());
    router.push('/');
  };
  const toggleTripsMenu=()=>{
    setIsTripMenuOpen(!isTripMenuOpen);
  }
  const handleCreateTrip=()=>{
    setIsCreateTripOpen(!isCreateTripOpen);
    setIsTripMenuOpen(false);
  }
  return (
   <div className='w-full'>
     
      <nav className='w-full bg-white  shadow-md sticky z-500 top-0 p-2 flex flex-row items-center justify-between lg:justify-around'>
      <div className='flex flex-row justify-between mx-3 lg:mx-0 lg:justify-around items-center w-full'>
        
          <img src="/logo.svg" className='p-2' alt="logo" />
          <img 
            // src="/menu.svg" 
            src={isMobileMenuOpen ? "/close.svg" : "/menu.svg"}
            className="lg:hidden  w-8 h-8 m-2 cursor-pointer" 
            alt="menu" 
            onClick={toggleMobileMenu}
          />
          
          <ul className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto 
            bg-white lg:bg-transparent p-4 lg:p-3 shadow-md lg:shadow-none
            m-0 text-black text-lg font-semibold items-center`}>
          {mode==="default" && (
            <>
          <li><Link onClick={()=>setIsMobileMenuOpen(false)} href="/" className=' decoration-none my-2 lg:m-1 p-2'>Home</Link></li>
          <li><Link onClick={()=>setIsMobileMenuOpen(false)} href="/explore" className=' decoration-none my-2 lg:m-1 p-2'>Explore</Link></li>
          <li ><Link onClick={()=>setIsMobileMenuOpen(false)} href="/#about" className='decoration-none my-2 lg:m-1 p-2'>About</Link></li>
          </>
        )}
        {mode==="loggedIn" && (
          <>
          
          <li><Link onClick={()=>setIsMobileMenuOpen(false)} href="/dashboard" className=' decoration-none my-1 lg:m-1 p-2 px-4'>Home</Link></li>
          <li><Link onClick={()=>setIsMobileMenuOpen(false)} href="/dashboard/explore" className=' decoration-none my-1 lg:m-1 p-2 px-4'>Explore</Link></li>
          <li>
            <div ref={menuRef} className='relative'>
            <button onClick={toggleTripsMenu} className=' decoration-none my-1 lg:m-1 p-1 px-4 '>Trips</button>
          {isTripMenuOpen && (
            <>
             <div className="absolute bottom-[-5px] left-8  w-3 h-3 bg-white border border-gray-100 transform rotate-45 z-40" />
            
          <div className="absolute top-full  font-normal text-[15px]  w-48 bg-white shadow-2xl rounded-md py-2 z-50">
            <button 
              onClick={handleCreateTrip}
              className="block w-full text-left px-4 py-1 hover:bg-gray-100"
              >
              Start a New Trip
            </button>
            <Link
              onClick={()=>setIsTripMenuOpen(false)}
              href="/dashboard/trips" 
              className="block px-4 py-1 hover:bg-gray-100"
            >
              My Trips
            </Link>
            <button 
              onClick={handleCreateTrip}
              className="block w-full text-left px-4 py-1 hover:bg-gray-100"
              >
              Create trip with AI
            </button>
          </div>
          </>
        )}
        </div>
        </li>
          <li><Link href="/dashboard#about" onClick={()=>setIsMobileMenuOpen(false)} className='decoration-none my-1 lg:m-1 p-2'>About</Link></li>
          </>
          )}

          </ul>
        <div className='hidden lg:block'>
          {mode==="default" && (
        <ButtonComponent onClick={openModal} sx={{ m: 1, py: 2,px:3, fontSize: '16px' ,height: '40px'}}>
          Sign In
        </ButtonComponent>
          )}
          {
            mode==="loggedIn" && (
              <ButtonComponent onClick={handleLogOut} sx={{ m: 1, py: 2,px:3, fontSize: '16px' ,height: '40px'}}>
          Log Out
        </ButtonComponent>
            )
          }
        </div>
        </div>
      </nav>
      <CreateTrip 
        open={isCreateTripOpen} 
        onClose={() => setIsCreateTripOpen(false)} 
      />
      
      <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
    </div>
  );
};

export default Navbar;