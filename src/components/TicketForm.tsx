import { useState, useEffect } from "react";
import TicketFormHeader from "./TicketFormHeader";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import Ready from "./Ready";

export default function TicketForm(){
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if(localStorage.getItem('tab') && localStorage.getItem('tab') !== 'NaN'){
      setTab(Number(localStorage.getItem('tab')));
    }
  }, []);

  const changeTab = (i: number) => {
    setTab(i);
    localStorage.setItem('tab', `${i}`);
  }


  return (
    <section className="w-full h-full flex items-center justify-center">
    { tab < 3 && (<section className="w-full p-[24px] max-w-[700px] lg:left-[370px] lg:right-[370px] flex flex-col gap-[32px] lg:p-[48px] bg-[#041e23] border-[1px] border-[#0e464f] rounded-[32px] lg:rounded-[40px] mx-auto md:mt-[70px] lg:mt-[40px] mt-[40px] h-fit">
      {
        tab < 3 && (
          <TicketFormHeader
            step={tab}
            title={tab == 1 ? 'Ticket Selection': 'Attendee Details'}
          />
        )
      }
      {
        tab === 1 && (
          <TicketSelection  setTab={changeTab}  />
        )
      }
      {
        tab === 2 && (
          <AttendeeDetails setTab={changeTab} />
        )
      }
    </section>)}
    { tab === 3 && (<Ready setTab={changeTab} />) }
    </section>
  );
}
