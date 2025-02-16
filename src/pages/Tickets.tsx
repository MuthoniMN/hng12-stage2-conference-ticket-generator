import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { TTicketDetails } from "../types/";
import Bars from '../components/Bars';
import SavedDetails from '../components/SavedDetails';
import BarCode from "../components/BarCode";
import TicketContainer from '../components/TicketContainer';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { NavLink } from "react-router";

export default function Tickets() {
  const [tickets, setTickets] = useState<TTicketDetails[]>([]);
  const [page, setPage] = useState(1);
  const end = page * 3;
  const start = end - 3;
  const [paginated, setPaginated] = useState<TTicketDetails[]>(tickets.slice(start, end));
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tickets') as string);
    if(saved !== null){
      setTickets(saved);
    }

    console.log(saved);
  }, []);

  useEffect(() => {
    setPaginated(tickets.slice(start, end))
  }, [page, tickets]);

  const next = () => {
    if(page + 1 <= Math.ceil(tickets.length / 3)){
      setPage(page => page + 1);
    }
  }

  const prev = () => {
    if(page - 1 > 0){
      setPage(page => page - 1);
    }
  }

  return (
    <section className="lg:py-[112px] py-[64px] px-[20px] flex-col md:gap-[80px] gap-[48px] mobile:w-[375px] w-[100vw] gradient bg-no-repeat bg-cover h-fit">
      <Navigation />
      <section className="flex flex-col gap-[16px]">
        <h1 className="text-white text-[32px] text-center font-bold">Your Tickets</h1>
        <section className="flex gap-[16px] items-center">
        {
          tickets && tickets.length > 0 ? (
            paginated.map((ticket: TTicketDetails, index) => (
              <TicketContainer key={index}>
                <Bars />
                <SavedDetails tick={ticket} />
                <BarCode />
              </TicketContainer>
            ))) : (
            <section className="w-full text-center h-[80vh] flex flex-col justify-center items-center gap-[16px] text-white">
              <h1 className="text-white text-[24px] text-center font-bold">No Available Tickets!</h1>
              <p>You've not created a ticket yet</p>
              <NavLink to="/">
                <button className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#24a0b5] text-white leading-[150%] justify-center cursor-pointer transition-all ease-in-out duration-200 hover:bg-[#0e4048] hover:font-bold hover:shadow-md">Create Ticket</button>
              </NavLink>
            </section>
          )
        }
        </section>
        { tickets.length > 0 && (
        <div className="flex gap-[4px] items-center w-full justify-end px-[48px] py-[12px]">
            <button onClick={() => prev()} className="bg-[#ffffff] py-[6px] px-[8px] flex justify-center items-center gap-[8px] rounded-[12px] border-[1px] border-[#D5EA001A] text-[#0a0c11] text-[16px] leading-[20px] transition-all ease-in-out duration-400 hover:font-bold hover:shadow-lg cursor-pointer">
              <FaAngleLeft />
            </button>
            <div className="flex gap-[4px] text-white text-[18px]">
            {
              Array.from({ length: Math.ceil(tickets.length/3)}).map((_, i) => (
                <p className={`px-[4px] hover:underline ${page === i + 1 && 'underline font-bold'}`} onClick={() => setPage(i + 1)}>{i + 1}</p>
              ))
            }
            </div>
            <button onClick={() => next()} className="bg-[#ffffff] py-[6px] px-[8px] flex justify-center items-center gap-[8px] rounded-[12px] border-[1px] border-[#D5EA001A] text-[#0a0c11] text-[16px] leading-[20px] transition-all ease-in-out duration-400 hover:font-bold hover:shadow-lg cursor-pointer">
              <FaAngleRight />
            </button>
        </div>)
        }
      </section>
    </section>
  );
}
