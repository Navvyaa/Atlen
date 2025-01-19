"use client";
import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import ButtonComponent from './ui/ButtonComponent';
import LoginModal from './auth/LoginModal';

const Navbar: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={isModalOpen ? 'blur-background w-full' : 'w-full'}>
      <nav className='w-full bg-white shadow-sm p-2 flex flex-row justify-around'>
        <div className='font-semibold text-black text-xl p-4'>Atlen</div>
        <ul className='m-1 p-3 text-black text-lg font-semibold flex flex-row justify-center'>
          <li>
            <a href="#features" className=' decoration-none m-1 p-2'>Features</a>
          </li>
          <li>
            <a href="#explore" className=' decoration-none m-1 p-2'>Explore</a>
          </li>
          <li className='m-0'>
            <a href="#HowItWorks" className=' decoration-none m-1 p-2'>How It Works</a>
          </li>
          <li className='m-0'>
            <a href="#about" className=' decoration-none m-1 p-2'>About</a>
          </li>
        </ul>
        <ButtonComponent onClick={openModal} sx={{ m: 1, py: 2,px:3, fontSize: '16px' ,height: '40px'}}>
          Sign In
        </ButtonComponent>
      </nav>
      <LoginModal open={isModalOpen} onClose={closeModal} step={1} />
    </div>
  );
};

export default Navbar;