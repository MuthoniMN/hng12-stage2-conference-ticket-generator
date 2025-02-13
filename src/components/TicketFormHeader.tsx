export default function TicketFormHeader({ step, title }: { step: number, title: string }){
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-col md:flex-row justify-between gap-[12px]">
        <h1 className="text-white text-[32px]">{title}</h1>
        <p className="text-[16px] leading-[150%] roboto text-[#fafafa] md:self-end">Step {step}/3</p>
      </div>
      <div className="rounded-[5px] h-[4px] w-full bg-transparent">
        <div style={{ width: `${Math.ceil((step / 3) * 100)}%` }} className="bg-[#24a0b5] h-full"></div>
      </div>
    </div>
  );
}
