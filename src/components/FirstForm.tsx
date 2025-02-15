import { useContext, useRef } from "react";
import { IoIosWarning } from "react-icons/io";
import { FormContext } from "../contexts/FormContext";
import { TErrors } from "../types/";

export default function FirstForm({ setTab, hide=false } : { setTab: (i: number) => void, hide?: boolean }){
  const { errors, setErrors, formData, reset, handleChange } = useContext(FormContext);
  const freeRef = useRef<HTMLInputElement | null>(null);
  const regularRef = useRef<HTMLInputElement | null>(null);
  const vvipRef = useRef<HTMLInputElement | null>(null);

  const next = () => {
    setErrors({} as TErrors);
    if(!formData.type){
      setErrors({...errors, type: "Please select a ticket type"})
    } 
    if(!formData.quantity){
      setErrors({...errors, quantity: "Please select the number of tickets"});
    } 
    if(formData.type && formData.quantity){
      setTab(2);
    }
  }

  return (
    <>
      <form className={`${hide &&'lg:hidden'} flex flex-col gap-[8px]`}>
        <label htmlFor="type" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Select Ticket Type</label>
        <div className="p-[16px] flex flex-col lg:flex-row gap-[16px] rounde-[24px] bg-[#052228] border-[1px] border-[#07373f] rounded-[24px]">
          <input type="radio" value="Free" name="type" ref={freeRef} onChange={handleChange} className="hidden" onFocus={() => (freeRef.current as HTMLInputElement).focus()} />
          <input type="radio" value="Regular" name="type" ref={regularRef} className="hidden" onChange={handleChange} onFocus={() => (freeRef.current as HTMLInputElement).focus()} />
          <input type="radio" value="VVIP" name="type" ref={vvipRef} className="hidden" onChange={handleChange} onFocus={() => (vvipRef.current as HTMLInputElement).focus()} />
          <div className={`w-full lg:w-3/10 flex flex-col gap-[12px] p-[12px] rounded-[12px] ${ formData.type == 'Free' ? 'bg-[#12464e] border-[1px] border-[#197686]' : 'border-[1px] border-[#197686]'}`} onClick={() => (freeRef.current as HTMLInputElement).click()}>
            <h3 className="text-white roboto font-bold text-[24px] leading-[110%]">Free</h3>
            <div>
              <p className="text-[16px] text-[#fafafa] leading-[150%] roboto">Regular Access</p>
              <p className="text-[14px] leading-[150%] text-[#d9d9d9] roboto">20/52</p>
            </div>
          </div>
          <div className={`w-full lg:w-3/10 flex flex-col gap-[12px] p-[12px] rounded-[12px] ${ formData.type == 'Regular' ? 'bg-[#12464e] border-[1px] border-[#197686]' : 'border-[1px] border-[#197686]'}`} onClick={() => (regularRef.current as HTMLInputElement).click()}>
            <h3 className="text-white roboto font-bold text-[24px] leading-[110%]">$150</h3>
            <div>
              <p className="text-[16px] text-[#fafafa] leading-[150%] roboto">VIP Access</p>
              <p className="text-[14px] leading-[150%] text-[#d9d9d9] roboto">20/52</p>
            </div>
          </div>
          <div className={`w-full lg:w-3/10 flex flex-col gap-[12px] p-[12px] rounded-[12px] ${ formData.type == 'VVIP' ? 'bg-[#12464e] border-[1px] border-[#197686]' : 'border-[1px] border-[#197686]'}`} onClick={() => (vvipRef.current as HTMLInputElement).click()}>
            <h3 className="text-white roboto font-bold text-[24px] leading-[110%]">$150</h3>
            <div>
              <p className="text-[16px] text-[#fafafa] leading-[150%] roboto">VVIP Access</p>
              <p className="text-[14px] leading-[150%] text-[#d9d9d9] roboto">20/52</p>
            </div>
          </div>
        </div>
        {errors.type && <p className="flex gap-4 text-red-500 font-bold items-center">
            <IoIosWarning />
            <span>{errors.type}</span>
          </p>}
        <label htmlFor="quantity" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Number of Tickets:</label>
        <select name="quantity" id="quantity" className="rounded-[12px] p-[12px] border-[1px] border-[#07373f]flex flex-row gap-[8px] items-center text-[#fafafa]" onChange={handleChange} value={formData.quantity}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {errors.quantity && <p className="flex gap-4 text-red-500 font-bold items-center">
            <IoIosWarning />
            <span>{errors.quantity}</span>
          </p>}
      </form>

      <div className={`${hide &&'lg:hidden'} flex flex-col lg:flex-row-reverse gap-[16px] lg:gap-[24px]`}>
        <button onClick={() => next()} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#24a0b5] text-white leading-[150%] justify-center cursor-pointer transition-all ease-in-out duration-200 hover:bg-[#0e4048] hover:font-bold hover:shadow-md">Next</button>
        <button onClick={() => reset()} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#24a0b5] text-[#24a0b5] leading-[150%] justify-center cursor-pointer hover:font-bold hover:border-[2px] transition-all ease-in-out duration-200">Cancel</button>
      </div>
      </>
  );
}
