"use client"
import React ,{useState} from 'react';
import { useRouter } from 'next/navigation';
import ButtonComponent from './ButtonComponent';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    // router.push('/login');
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
      <ButtonComponent onClick={handleLoginClick}>
        Login
      </ButtonComponent>
    </nav>
    <LoginModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Navbar;