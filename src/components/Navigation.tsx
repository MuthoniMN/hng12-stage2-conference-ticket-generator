import { FaArrowRight } from "react-icons/fa6";

export default function Navigation(){
  return (
    <div className="backdrop-blur-[2px] fixed top-[10px] right-[27.5px] left-[27.5px] lg:left-[56px] lg:right-[56px] md:top-[24px] desktop:left-[120px] desktop:right-[120px] mobile:w-[320px] xs:w-[90%] desktop:w-[1200px] flex justify-between items-center border-[1px] border-[#197686] background-[#05252c66] rounded-[24px] py-[12px] px-[16px] h-fit z-30">
      <img src="./logo.png" alt="Tic - Buy Event Tickets" />
      <nav className="hidden md:block">
        <ul className="flex gap-[16px] items-center">
          <li className="p-[10px] text-[18px] text-white hover:underline transition-all ease-in-out duration-300 cursor-pointer">Events</li>
          <li className="p-[10px] text-[18px] text-[#b3b3b3] hover:underline transition-all ease-in-out duration-300 hover:text-white cursor-pointer">My Tickets</li>
          <li className="p-[10px] text-[18px] text-[#b3b3b3] hover:underline transition-all ease-in-out duration-300 hover:text-white cursor-pointer">About Project</li>
        </ul>
      </nav>
      <button className="bg-[#ffffff] py-[12px] px-[16px] md:py-[16px] md:px-[24px] flex justify-center items-center gap-[8px] rounded-[12px] border-[1px] border-[#D5EA001A] text-[#0a0c11] text-[16px] leading-[20px] transition-all ease-in-out duration-400 hover:font-bold hover:shadow-lg cursor-pointer">
        <p>MY TICKETS</p>
        <FaArrowRight />
      </button>
    </div>
  );
}
