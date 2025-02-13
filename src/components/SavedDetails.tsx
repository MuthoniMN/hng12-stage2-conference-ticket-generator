import { useState, useEffect } from "react";
import { TTicketDetails } from "../types/";

export default function SavedDetails(){
  const [ticket, setTicket] = useState<TTicketDetails>({} as TTicketDetails);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recent') as string);

    setTicket(saved);
  }, [])
  
  return (
    <section className="w-full p-[14px] rounded-[16px] bg-[#031e21] border-[1px] border-[#24a0b51a] backdrop-blur-[2px] h-full">
    <div className="flex flex-col items-center gap-[20px] h-full">
      <div className="mx-auto">
        <h1 className="road_rage text-white text-[34px] text-center">Techember Fest "25</h1>
        <div className="p-[4px] flex flex-col w-fit mx-auto">
          <p className="roboto text-[10px] leading-[150%] text-left text-white">📍 04 Rumens road, Ikoyi, Lagos</p>
          <p className="roboto text-[10px] leading-[150%] text-left text-white">📅 March 15, 2025 | 7:00 PM</p>
        </div>
      </div>
      <div className="w-[140px] h-[140px] rounded-[12px] border-[4px] border-[#24a0b5] border-[#24a0b580]">
        <img src={ticket.picture} alt={ticket.name} className="w-full h-full" />
      </div>
      <div className="p-[4px] bg-[#08343c] rounded-[8px] border-[1px] border-[#133d44] divide-y-[1px] divide-[#12464e]">
        <div className="divide-x-[1px] divide-[#12464e] flex gap-[8px] items-center">
          <div className="flex flex-col gap-[4px] p-[4px] w-[47%]">
            <p className="text-white text-[10px] roboto leading-[150%] text-left">Enter your name</p>
            <p className="text-white font-bold text-[12px] roboto leading-[150%] text-left overflow-scroll">{ticket.name}</p>
          </div>
          <div className="flex flex-col gap-[4px] p-[4px] w-[47%]">
            <p className="flex"><span className="text-white text-[10px] roboto leading-[150%] text-left flex">Enter your email</span><span className="self-start">*</span></p>
            <p className="text-white font-bold text-[12px] roboto leading-[150%] text-left overflow-scroll">{ticket.email}</p>
          </div>
        </div>
        <div className="divide-x-[1px] divide-[#12464e] flex gap-[8px] items-center">
         <div className="flex flex-col gap-[4px] p-[4px] w-[47%]">
            <p className="text-white text-[10px] roboto leading-[150%] text-left">Ticket Type: </p>
            <p className="text-white font-bold text-[12px] roboto leading-[150%] text-left overflow-scroll">{ticket.type}</p>
          </div>
          <div className="flex flex-col gap-[4px] p-[4px] w-[47%]">
            <p className="text-white text-[10px] roboto leading-[150%] text-left">Ticket for: </p>
            <p className="text-white font-bold text-[12px] roboto leading-[150%] text-left overflow-scroll">{ticket.quantity}</p>
          </div>
        </div>
        <div className="flex flex-col p-[8px] gap-[4px] justify-center">
            <p className="text-white text-[10px] roboto leading-[150%] text-left">Special request? </p>
            <p className="text-white font-bold text-[12px] roboto leading-[150%] text-left">{ticket.request}</p>
        </div>
      </div>
    </div>
    </section>
  )
}
