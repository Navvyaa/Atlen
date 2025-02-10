"use client";
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ModalComponent from '../ui/ModalComponent';
import InputComponent from '../ui/InputComponent';
import ButtonComponent from '../ui/ButtonComponent';
import Image from 'next/image';
// import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import IconButton from '@mui/material/IconButton';

interface CreateTripProps {
  open: boolean;
  onClose: () => void;
  
}

const CreateTrip: React.FC<CreateTripProps> = ({ open, onClose }) => {
  const [tripName, setTripName] = useState<string>("");
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [friends, setFriends] = useState<string[]>([]);
  const [nameError, setNameError] = useState<boolean>(false);
  const handlecreateTrip = () => {
    console.log(tripName,destination,startDate,endDate,"hi" ,friends);
    // console.log("hi");
  }

  const today = new Date().toISOString().split("T")[0];
 
  console.log("Render tripName:", tripName === undefined ? "undefined" : tripName === null ? "null" : `"${tripName}"`);
  useEffect(() => {
    console.log("Updated tripName:", tripName);
  }, [tripName]);
  
  useEffect(() => {
    console.log("Updated destination:", destination);
  }, [destination]);
  
  return (


    <ModalComponent isOpen={open} onClose={onClose} mode='loggedIn' isInviteOpen={isInviteModalOpen}>
      <Box sx={{
        my: 2,
        px: { xs: 1.5, md: 1 },
        width: '400px',
        position: 'relative',
        transform: isInviteModalOpen ? { md: 'translateX(-38%)' } : 'none',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <InputComponent
          label="Trip Name"
          // error={nameError}
          // onInputChange={() => setNameError(false)}
          type="text"
          value={tripName }
          placeholder="Give your trip a name.."
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => 
            setTripName(e.target.value)}
        />
         <InputComponent
          label="Which places are you going"
          type="text"
          value={destination}
          placeholder="Select Countries"
          onChange={(e) => setDestination(e.target.value)}
                       />
        <div className='flex flex-row relative gap-4 justify-between'>
          
        <div className='w-full flex flex-col'>
            <label htmlFor="startDate" className='text-lg font-semibold pb-2'>Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e)=>{
                setStartDate(e.target.value)
                if (endDate && e.target.value > endDate) {
                  setEndDate("");
                }
              }}
              min={today}
             
              className='border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-hover hover:border-primary'
            />
          </div> 
         
          <Image src='/arrow-left.svg' width={24} height={24} alt='arrow' className='pt-6' />
         
           <div className='w-full flex flex-col'>
            <label htmlFor="endDate" className='text-lg font-semibold pb-2'>End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              
              className='border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-hover hover:border-primary'
            />
          </div> 
          
          
        </div>
        <div className={`flex  mt-6 ${isInviteModalOpen ? 'justify-end' : 'justify-between gap-5'}`}>
          {!isInviteModalOpen && (
            <div className='relative border border-primary rounded-2xl'>
              <ButtonComponent


                onClick={() => setIsInviteModalOpen(true)}
                variant="outlined"
                sx={{
                  py: 1,
                  fontSize: '18px',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  px: 2
                }}
              >
                <span className='text-primary text-2xl pr-4 pl-1 pb-1'>+</span>
                Invite Friends
              </ButtonComponent>
            </div>
          )}
          <div className={`${isInviteModalOpen ? "hidden md:block" : "md:block"}`}>
            <ButtonComponent onClick={handlecreateTrip} sx={{ py: 1, px: 4, fontSize: '18px', fontWeight: 'regular' }}>
              Create Trip
            </ButtonComponent>
          </div>
        </div>
      </Box>



      {isInviteModalOpen && (
        <div
          className=" md:w-[320px] w-[360px] bg-gray-100 h-full rounded-2xl p-6 md:absolute top-0 right-0 "
        >
          <div className="flex justify-between items-center mb-6 ">

            <h3 className="text-xl font-semibold  ">Add Travel Buddies</h3>
            <IconButton
              onClick={() => setIsInviteModalOpen(false)}
              sx={{ color: 'gray' }}
            >
              <Image
                src="/close.svg"
                width={24}
                height={24}
                alt="close"
              />
            </IconButton>
          </div>
          <InputComponent
            label='Add a travel buddy to your trip'
            type='text'
            // value={friends[0]||""}
            placeholder='Enter email address'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFriends([...friends, e.target.value]);
            }}
          />
        </div>
      )}
      <div className='md:hidden'>
        <div className={`${isInviteModalOpen ? " md:block " : " md:block hidden"} mt-6`}>
          <ButtonComponent onClick={handlecreateTrip} sx={{ py: 1, px: 4, fontSize: '18px', fontWeight: 'regular' }}>
            Create Trip
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>

  );
}

export default CreateTrip;