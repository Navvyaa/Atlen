import Image from 'next/image';

interface ServiceButtonProps {
  icon: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ 
  icon,
  text,
  onClick,
isActive=false }) => {
  return (
    <button 
      onClick={onClick}
      className={`border flex items-center gap-2 rounded-2xl p-2 px-4 transition-colors group
        ${isActive 
          ? 'border-secondary text-secondary' 
          : 'border-gray-400 hover:border-secondary hover:text-secondary'
        }`}>
     <div className={`transition-all ${
      isActive? '[filter:invert(10%)_sepia(100%)_saturate(4272%)_hue-rotate(325deg)_brightness(117%)_contrast(102%)]'
      :'group-hover:[filter:invert(10%)_sepia(100%)_saturate(4272%)_hue-rotate(325deg)_brightness(117%)_contrast(102%)]'}`}>  
        <Image src={icon} alt="" width={24} height={24} />
      </div>
      <span className="text-sm sm:text-md font-medium hover:text-secondary">{text}</span>
    </button>
  );
};

export default ServiceButton;