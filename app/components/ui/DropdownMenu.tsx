"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: string;
}

interface DropdownMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  header?: string;
  onHeaderClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen,
  header,
  onHeaderClick,
}) => {
  return (
    <div className="relative">
      <button 
        onClick={onHeaderClick} 
        className="decoration-none my-1 lg:m-1 p-1 px-4 flex items-center gap-2"
      >
        {header}
        
      </button>

      {isOpen && (
        <>
          <div className="absolute bottom-[-5px] left-8 w-3 h-3 bg-white border border-gray-100 transform rotate-45 z-40" />
          <div className="absolute top-full font-normal text-[15px] w-48 bg-white shadow-2xl rounded-md py-2 z-50">
            {items.map((item, index) => (
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onHeaderClick}
                  className="block px-4 py-1 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`block w-full text-left px-4 py-1 hover:bg-gray-100 ${item.icon ? 'flex items-center gap-4' : ''}`}
                >
                  {item.icon && (
                  <Image alt="" src={item.icon} width={25} height={25} />
                  )}
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;