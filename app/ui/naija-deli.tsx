import { HomeModernIcon } from '@heroicons/react/16/solid';
import { montserrat } from '@/app/ui/fonts';

export default function NaijaDeli() {
  
  return (
    <div className={`flex items-center justify-center leading-none`}>
      <HomeModernIcon className="h-10 w-10 text-[#008000]" /> 

      <p className="text-2xl font-semibold text-[#008000] ml-2 md:inline"> 
        Naija
        <span className="text-[#ffa500]">Deli</span>
      </p>
    </div>
  ); 
}
