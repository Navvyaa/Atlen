"use client";
import React, { useState } from 'react';
import { useModal } from '@/app/context/ModalContext';
import ButtonComponent from './ui/ButtonComponent';
import LoginModal from './auth/LoginModal';
import Link from 'next/link';
import { logout } from '@/app/features/auth/slices/authSlice';
import { AppDispatch } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
interface NavbarProps {
  mode?:"loggedIn" | "default";
}

const Navbar: React.FC <NavbarProps>= ({mode="default"}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogOut = () => {
    dispatch(logout());
    router.push('/');
  };
  return (
   <div className='w-full'>
     
      <nav className='w-full bg-white shadow-md sticky z-500 top-0 p-2 flex flex-row items-center justify-between lg:justify-around'>
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
          <li><Link href="/" className=' decoration-none my-2 lg:m-1 p-2'>Home</Link></li>
          <li><Link href="/explore" className=' decoration-none my-2 lg:m-1 p-2'>Explore</Link></li>
          <li ><Link href="/#about" className='decoration-none my-2 lg:m-1 p-2'>About</Link></li>
          </>
        )}
        {mode==="loggedIn" && (
          <>
          <li><Link href="/dashboard" className=' decoration-none my-1 lg:m-1 p-2 px-4'>Home</Link></li>
          <li><Link href="/dashboard/explore" className=' decoration-none my-1 lg:m-1 p-2 px-4'>Explore</Link></li>
          <li><Link href="/dashboard/trips" className=' decoration-none my-1 lg:m-1 p-2 px-4'>Trips</Link></li>
          <li><Link href="/dashboard#about" className='decoration-none my-1 lg:m-1 p-2'>About</Link></li>
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
      <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
    </div>
  );
};

export default Navbar;