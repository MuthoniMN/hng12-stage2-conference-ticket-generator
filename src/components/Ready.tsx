import TicketFormHeader from './TicketFormHeader';
import TicketContainer from './TicketContainer';
import Bars from './Bars';
import SavedDetails from './SavedDetails';
import BarCode from "./BarCode";
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';

export default function Ready({ setTab } : { setTab: (i: number) => void }){
  const handleDownload = async() => {
    const img = await html2canvas(document.querySelector('#ticket') as HTMLElement, { useCORS: true, scale: 2 });
    const url = img.toDataURL('image/png');

    downloadjs(url, 'your_ticket.png', 'image/png');
  }
  return (
    <section className="relative top-0 md:top-[-54px] lg:top-[-124px] w-[90%] max-w-[700px] flex flex-col gap-[32px] px-[24px] py-[32px] lg:p-[48px] rounded-[24px] bg-[#041e23] border-[#0e464f] border-[1px] h-fit min-h-[100vh]">
      <TicketFormHeader title="Ready" step={3} />
      <section className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <h1 className="text-white text-[32px] text-center">Your Ticket is Booked!</h1>
          <p className="text-[#fafafa] roboto text-[16px] leading-[150%] text-center">Check your email for a copy or you can <span className="font-bold text-[16px] leading-[150%]">download</span></p>
        </div>
      <TicketContainer>
        <Bars />
        <SavedDetails />
        <BarCode />
      </TicketContainer>

      <div className={`flex flex-col lg:flex-row-reverse gap-[16px] lg:gap-[24px] items-center justify-center w-full`}>
        <button className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#24a0b5] text-white leading-[150%] justify-center cursor-pointer transition-all ease-in-out duration-200 hover:bg-[#0e4048] hover:font-bold hover:shadow-md" onClick={() => handleDownload()}>Download Ticket</button>
        <button className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#24a0b5] text-[#24a0b5] leading-[150%] justify-center cursor-pointer hover:font-bold hover:border-[2px] transition-all ease-in-out duration-200" onClick={() => setTab(1)}>Book Another Ticket</button>
      </div>
      </section>
    </section>
  );
}
