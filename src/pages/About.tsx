import Navigation from '../components/Navigation';
import { FaCheck } from "react-icons/fa6";

export default function About () {
  return (
    <section className="lg:py-[112px] py-[64px] px-[20px] flex-col md:gap-[80px] gap-[48px] mobile:w-[375px] w-[100vw] gradient bg-no-repeat bg-cover h-fit">
      <Navigation />
      <h1 className="text-white text-[32px] text-center font-bold">About ticz</h1>
      <section className="w-full p-[24px] max-w-[700px] lg:left-[370px] lg:right-[370px] flex flex-col gap-[32px] lg:p-[48px] bg-[#041e23] border-[1px] border-[#0e464f] rounded-[32px] lg:rounded-[40px] mx-auto md:mt-[70px] lg:mt-[40px] mt-[40px] h-fit text-[#fafafa]">
        <p> Ticz is a conference ticketing platform that allows you to get ickets for your favorite upcoming conferences </p>
        <p>With ticz, you can: </p>
        <ul>
          <li className="flex gap-4 items-center"><FaCheck className="text-emerald-500 text-lg" /> Stay updated on upcoming events</li>
          <li className="flex gap-4 items-center"><FaCheck className="text-emerald-500 text-lg" /> Buy tickets at the best prices</li>
          <li className="flex gap-4 items-center"><FaCheck className="text-emerald-500 text-lg" /> Download your tickets for the conference</li>
        </ul>
      </section>
    </section>
  );
}
