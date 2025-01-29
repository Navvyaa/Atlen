"use client";
import React, { useState } from 'react';
import { useModal } from '@/app/context/ModalContext';
import ButtonComponent from './ui/ButtonComponent';
import LoginModal from './auth/LoginModal';
import Link from 'next/link';


const Navbar: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
  //  <div className='w-full'>
      <div className={isModalOpen ? 'blur-background w-full' : 'w-full'}> 
      <nav className='w-full bg-white shadow-md sticky z-50 top-0 p-2 flex flex-row items-center justify-between lg:justify-around'>
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
          
          <li>
            <Link href="/" className=' decoration-none my-2 lg:m-1 p-2'>Home</Link>
          </li>
          <li>
            <a href="/explore" className=' decoration-none my-2 lg:m-1 p-2'>Explore</a>
          </li>
          {/* <li className='m-0'>
            <a href="#HowItWorks" className=' decoration-none m-1 p-2'>Trips</a>
          </li> */}
          <li className='m-0'>
            <Link href="/#about" className='decoration-none my-2 lg:m-1 p-2'>About</Link>
          </li>
        </ul>
        <div className='hidden lg:block'>
        <ButtonComponent onClick={openModal} sx={{ m: 1, py: 2,px:3, fontSize: '16px' ,height: '40px'}}>
          Sign In
        </ButtonComponent>
        </div>
        </div>
      </nav>
      <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
    </div>
  );
};

export default Navbar;