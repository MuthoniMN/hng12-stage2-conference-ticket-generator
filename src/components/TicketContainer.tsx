import { ReactNode } from "react";

export default function TicketContainer({ children }: { children: ReactNode }){
  return (
      <div className="relative w-[300px] h-fit min-h-[640px] ticket-container mx-auto px-[16px] py-[24px] h-full bg-[#041e23]"  id="ticket">
        <div className="w-[30px] h-[30px] absolute -top-[10px] -left-[10px] bg-[#041e23] border-[#24a0b5] border-r-[1px] rounded-full"></div>
        <div className="w-[30px] h-[30px] absolute bottom-[120px] -right-[10px] bg-[#041e23] border-[#24a0b5] border-s-[1px] rounded-full z-2"></div>
        <div className="w-[30px] h-[30px] absolute bottom-[120px] -left-[10px] bg-[#041e23] border-[#24a0b5] border-r-[1px] rounded-full z-2"></div>
        <div className="w-[30px] h-[30px] absolute -top-[10px] -right-[10px] rounded-full bg-[#041e23] border-[#24a0b5] border-s-[1px] "></div>
        <div className="w-[30px] h-[30px] absolute -bottom-[10px] -left-[10px] rounded-full bg-[#041e23] border-[#24a0b5] border-e-[1px] "></div>
        <div className="w-[30px] h-[30px] absolute -bottom-[10px] -right-[10px] rounded-full bg-[#041e23] border-[#24a0b5] border-s-[1px] "></div>
        {children}
      </div>
  );
}
