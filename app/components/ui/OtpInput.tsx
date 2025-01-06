import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange: (otp: string) => void;
  error?:boolean;
  // onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const OTPInput = ({ length = 6, onComplete,onChange,error  }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;//
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    
    if (newOtp.every(val => val !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace'  && !otp[index] && index > 0)  {
      if (!otp[index] && index > 0) {
        
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
  
    if (!/^\d+$/.test(pastedData)) return; 
  
    const newOtp = [...otp];
    pastedData.split('').forEach((value, index) => {
      newOtp[index] = value;
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = value;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join('')); 
  
    if (newOtp.every(val => val !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex justify-between gap-2">
        {otp.map((_, index) => (
          <div key={index} className="relative w-14 ">
            <input
              type="text"
              maxLength={1}
              ref={el => { inputRefs.current[index] = el; }}
              value={otp[index]}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              // onKeyPress={onKeyPress}
              className={`w-full h-12 text-center font-medium rounded-lg bg-neutral-100 focus:border-primary focus:outline-none border text-lg outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {!otp[index] && (
              <div className="absolute bottom-2 left-1.5 right-2  w-[78%] h-0.5 bg-neutral-700 rounded-lg"></div>
            )}
            {/* {otp[index] && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OTPInput;