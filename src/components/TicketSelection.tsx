import FirstForm from "./FirstForm.tsx";

export default function TicketSelection({ setTab } : { setTab: (i: number) => void }){
  return (
    <>
    <section className="hidden lg:block flex flex-col space-y-[32px] p-[24px] bg-[#08252b] border-[1px] border-[#0e464f] rounded-[32px]">
      <div className="flex flex-col gap-[8px] py-[16px] px-[24px] md:py-[24px] rounded-[24px] border-[2px] border-t-0 border-[#07373f] event-gradient h-[243px] justify-between">
        <div className="flex flex-col gap-[8px] text-center items-center justify-center">
          <h2 className="text-[48px] lg:text-[62px] leading-[100%] text-[#fafafa] road_rage">Techember Fest ”25</h2>
          <p className="lg:w-[340px] roboto text-[14px] md:text-[16px] leading-[150%] text-[#fafafa]">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
        </div>
        <div className="flex flex-col gap-[4px] lg:flex-row lg:gap-[16px] w-full text-[#fafafa] justify-center text-center">
          <p>📍 [Event Location]</p>
          <p className="hidden lg:block">||</p>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </div>
      <div className="h-[4px] bg-[#07373f] w-full"></div>
      <FirstForm setTab={setTab} />
      </section>
      <div className="lg:hidden flex flex-col gap-[8px] py-[16px] px-[24px] md:py-[24px] rounded-[24px] border-[2px] border-t-0 border-[#07373f] event-gradient h-[243px] justify-between">
        <div className="flex flex-col gap-[8px] text-center items-center justify-center">
          <h2 className="text-[48px] lg:text-[62px] leading-[100%] text-[#fafafa] road_rage">Techember Fest ”25</h2>
          <p className="lg:w-[340px] roboto text-[14px] md:text-[16px] leading-[150%] text-[#fafafa]">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
        </div>
        <div className="flex flex-col gap-[4px] lg:flex-row lg:gap-[16px] w-full text-[#fafafa] justify-center text-center">
          <p>📍 [Event Location]</p>
          <p className="hidden lg:block">||</p>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </div>
      <div className="lg:hidden h-[4px] bg-[#07373f] w-full"></div>
      <FirstForm setTab={setTab} hide={true}  />
    </>
  )
}
