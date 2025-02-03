"use client"

import React from 'react';
// import Image from 'next/image';
import { CircularProgress } from '@mui/material';


interface LoadingProps {
  open: boolean; 
  title?: string;
  subtitle?: string;

}

const Loading: React.FC<LoadingProps> = ({ open,title,subtitle, }) => {
  return (
    
      <div className="flex flex-col mt-5 w-full h-full items-center justify-center">
      
       <p className='font-semibold text-2xl text-primary text-center my-8'>
        {title}
      </p>
      <CircularProgress size={70} color='primary'/>
        {/* <Image src="/Large.gif" alt="loading" width={150} height={150} /> */}
        {subtitle && (
        <p className='text-gray-600 text-md text-center mt-10 mb-8'>
          Please wait ... <br />
          {subtitle}
        </p>
       
      )}
      </div>
   
  );
};

export default Loading;