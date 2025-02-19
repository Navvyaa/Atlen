"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Box,Slider } from '@mui/material';
import ModalComponent from '../ui/ModalComponent';
import InputComponent from '../ui/InputComponent';
import ButtonComponent from '../ui/ButtonComponent';
import Image from 'next/image';
import SnackbarComponent, { SnackbarRef } from '../ui/SnackbarComponent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface CreateTripProps {
  open: boolean;
  onClose: () => void;

}

const CreateTrip: React.FC<CreateTripProps> = ({ open, onClose }) => {
  const [tripName, setTripName] = useState<string>("");
  const [destination, setDestination] = useState<string>(String());
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const snackbarRef = useRef<SnackbarRef>(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [friends, setFriends] = useState<string[]>(['']); // Initialize with one empty inputconst 
  // [nameError, setNameError] = useState<boolean>(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const [travelType, setTravelType] = useState<string>("");
  const [budget, setBudget] = useState<number>(0);

 

  const handlecreateTrip = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(tripName,destination,startDate,endDate,"hi" ,friends);T
    if (!tripName.trim() || !destination.trim() || !startDate || !endDate) {
      snackbarRef.current?.showSnackbar('Enter all fields', 'error');
      return;
    }
    if (friends.length > 1 && friends.some(friend => friend.trim() === '')) {
      snackbarRef.current?.showSnackbar('Please enter email addresses for your friends', 'error');
      return;
    }
    // if()
    if (friends[0].trim() && !emailRegex.test(friends[0].trim())) {
      snackbarRef.current?.showSnackbar('Please provide valid email address', 'error');
      return;
    }

    if (friends.some(friend => friend.trim() && !emailRegex.test(friend.trim()))) {
      snackbarRef.current?.showSnackbar('Please provide valid email addresses ', 'error');
      return;
    }
    setStep(2);
    setIsInviteModalOpen(false);
    if (step == 2) {
      // onClose();

      console.log(tripName, destination, startDate, endDate, friends,travelType,budget);
      onClose();
      setStep(1);
      setTripName("");
      setDestination("");
      setStartDate("");
      setEndDate("");
      setFriends(['']);
      setTravelType("");
      setBudget(0);
    }
   
  }

  const today = new Date().toISOString().split("T")[0];


  return (


    <ModalComponent isOpen={open} onClose={onClose} mode='loggedIn' isInviteOpen={isInviteModalOpen}>

      <div className=' absolute bottom-00 '>
        <SnackbarComponent ref={snackbarRef} message={''} severity={'success'} />
      </div>

      <Box sx={{
        my: 2,
        px: { xs: 1.5, md: 1 },
        width: '400px',
        position: 'relative',
        transform: isInviteModalOpen ? { md: 'translateX(-38%)' } : 'none',
        transition: 'transform 0.3s ease-in-out'
      }}>
        {step == 1 && (
          <>
            <InputComponent
              label='Trip Name'
              type='text'
              value={tripName}
              placeholder="Give your trip a name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTripName(e.target.value)}
            />

            <InputComponent
              label="Which places are you going"
              type="text"
              value={destination || ""}
              placeholder="Select Countries"
              onChange={(e) => setDestination(e.target.value)}
            />
            <div className='flex flex-row relative gap-4 justify-between'>

              <div className='w-full flex flex-col'>
                <label htmlFor="startDate" className='text-md font-semibold pb-2'>Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value)
                    if (endDate && e.target.value > endDate) {
                      setEndDate("");
                    }
                  }}
                  min={today}

                  className='border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-hover hover:border-primary '
                />
              </div>

              <Image src='/arrow-left.svg' width={24} height={24} alt='arrow' className='pt-6' />

              <div className='w-full flex flex-col'>
                <label htmlFor="endDate" className='text-md font-semibold pb-2'>End Date</label>
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
          </>
        )}
        {step == 2 && (
          <>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Who is travelling with you?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
                {['Couple', 'Family', 'Friends', 'Solo'].map((type) => (
                  <div
                    key={type}
                    onClick={() => setTravelType(type)}

                    className={`p-4 border rounded-xl cursor-pointer transition-all ${travelType === type
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                      }`}
                  >
                    
                    <div className="w-16 h-16 mx-auto mb-2  bg-gray-100 rounded-full"></div>
                    <p className="text-center">{type}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Budget per person?</h3>
              <div className="px-2">
              <Slider
        value={budget}
        onChange={(e, newValue) => setBudget(newValue as number)}
        min={0}
        max={100000}
        step={5000}
        valueLabelDisplay="auto"
        sx={{
          color: "#4f46e5", // Primary color
          "& .MuiSlider-track": { backgroundColor: "#4f46e5" }, // Filled part
          "& .MuiSlider-thumb": { backgroundColor: "#4f46e5" }, // Circle thumb
        }}
      />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <div className='flex flex-col'>
                  <span>₹{budget.toLocaleString('en-IN')}</span>
                    <span>per day </span>
                  </div>
                  <div className='flex flex-col'>
                  <span>₹1,00,000</span>
                  <span>per day or more</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <ButtonComponent
                onClick={() => setStep(1)}
                variant="outlined"
                sx={{
                  py: 1,
                  px: 4,
                  fontSize: '18px',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)'
                }}
              >
                Back
              </ButtonComponent>
              <ButtonComponent
                onClick={handlecreateTrip}
                sx={{ py: 1, px: 4, fontSize: '18px' }}
              >
                Create Trip
              </ButtonComponent>
            </div>
          </>
        )}
      </Box>

      {isInviteModalOpen && step===1 &&(
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

          <div className="space-y-1 ">
            <div className='lg:max-h-[300px] max-h-[120px] w-full overflow-y-auto no-scrollbar'>
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center reltive ">

                  <input type="text"
                    value={friend}
                    placeholder='Enter email address'
                    className='p-2 pl-3 m-1 mr-4 rounded-xl w-full'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newFriends = [...friends];
                      newFriends[index] = e.target.value;
                      setFriends(newFriends);

                    }}
                  />
                  <IconButton
                    disabled={friends.length === 1} // Disable delete button for last remaining input

                    onClick={() => {
                      const newFriends = friends.filter((_, i) => i !== index);
                      setFriends(newFriends);
                    }}

                  >
                    <DeleteIcon className='absolute right-1' />
                  </IconButton>
                </div>
              ))}
            </div>
            {friends.length < 10 && (
              <button
                onClick={() => {
                  if (friends.length < 12) {
                    setFriends([...friends, '']);
                  }
                }}
                className='  p-2 rounded-3xl font-semibold text-gray-600 flex items-center'
              >
                <AddIcon sx={{ mr: 1 }} />

              </button>
            )}
            
          </div>
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