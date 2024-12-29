"use client";
import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import ButtonComponent from './ButtonComponent';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={isModalOpen ? 'blur-background w-full' : 'w-full'}>
      <nav className='w-full bg-green-600 p-2 flex flex-row justify-around'> 
        <div>Trippin</div>
        <ul className='m-1 p-1 text-white flex flex-row justify-center'>
          <li>
            <a href="#home" className='text-white decoration-none m-1 p-2'>Home</a>
          </li>
          <li>
            <a href="#about" className='text-white decoration-none m-1 p-2'>About Us</a>
          </li>
          <li className='m-0'>
            <a href="#packages" className='text-white decoration-none m-1 p-2'>Packages</a>
          </li>
        </ul>
        <ButtonComponent onClick={openModal}>
          Login
        </ButtonComponent>
      </nav>
      <LoginModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Navbar;