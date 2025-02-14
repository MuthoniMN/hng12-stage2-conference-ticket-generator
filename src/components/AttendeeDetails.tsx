import { useContext, useState, useRef } from "react";
import { FormContext } from "../contexts/FormContext";
import { IoIosWarning, IoMdMail } from "react-icons/io";
import { FaCheckSquare, FaCloudUploadAlt } from "react-icons/fa";
import { TTicketDetails } from "../types/";

export default function AttendeeDetails({ setTab }: { setTab: (e: number) => void }){
  const { formData, handleChange, errors, setErrors, setFormData } = useContext(FormContext);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const uploadImage = async (file: File) => {
    setLoading(true);
    setErrors({...errors, picture: ""});

    const fData = new FormData();
    fData.append("file", file);
    fData.append('upload_preset', 'event_ticket_app');
    fData.append('tags', 'event_files');

    try{
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: fData
      })
      const data = await response.json();

      if(data.secure_url){
        setFormData({
          ...formData,
          picture: data.secure_url
        });

      localStorage.setItem('formData', JSON.stringify(formData));

        setLoading(false);
      } else {
        setLoading(false);
        setErrors({ ...errors, picture: "Failed to upload!" });
      }
    } catch(e){
      console.error(e);
      setLoading(false);
      setErrors({ ...errors, picture: "Failed to upload!" });
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadImage(file);
    } else {
      setErrors({...errors, picture: "Please upload an image file."});
    }
  };

  const validate = (values: TTicketDetails) => {
    let errors = {};
    Object.keys(values).map(val => {
      if((values[val as keyof TTicketDetails]as string).length <= 0 && val !== "request"){
        errors = { ...errors, [val]: `Please provide your ${val}` };
      }
    })

    return errors;
  }

  const handleSave = () => {
    const errs = validate(formData);
    setErrors({ ...errors, ...errs })
    if(!errs){
      const savedInfo = localStorage.getItem('tickets') ? JSON.parse(localStorage.getItem('tickets') as string) : [];
      
      savedInfo.push(formData);

      localStorage.setItem('tickets', JSON.stringify(savedInfo));
      localStorage.setItem('recent', JSON.stringify(formData));
      localStorage.setItem('formData', "");
      setTab(3);
    }
  }

  return (
    <>
    <section className="hidden sm:block flex flex-col space-y-[32px] p-[24px] bg-[#08252b] border-[1px] border-[#0e464f] rounded-[32px]">
      <div className="flex flex-col gap-[32px] py-[16px] px-[24px] md:pt-[24px] md:pb-[48px] rounded-[24px] border-[1px] border-[#07373f] bg-[#052228] justify-between">
        <h3 className="text-[16px] leading-[150%] text-[#fafafa] roboto">Upload Profile Photo</h3>
        <div className="flex gap-[10px] text-center items-center justify-center h-[200px] bg-[#00000033] relative">
          <div className={`absolute w-[240px] h-[240px] flex flex-col gap-[16px] p-[24px] rounded-[32px] bg-[#0e464f] border-[#24a0b580] border-[4px] items-center justify-center cursor-pointer ${isDragging && 'bg-[#0a3137]'}`}         
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => (fileInputRef.current as HTMLInputElement).click()}
        >
          { (!loading && (!formData.picture) ) ? (
            <>
              <img src="./cloud-download.png" alt="" />
              <p className="text-[16px] leading-[150%] text-[#fafafa] roboto text-center">Drag & drop or click to upload</p>
            </>) : 
                (!loading && formData.picture) ? (
                  <>
                    <FaCheckSquare className="text-[32px] text-emerald-500" />
                    <p className="text-[16px] leading-[150%] text-[#fafafa] roboto text-center">Image uploaded successfully!</p>
                  </>) : (
              <>
                  <p className="w-[32px] h-[32px] animate-bounce rounded-full bg-[#052228] text-[#fafafa] flex justify-center items-center">
                    <FaCloudUploadAlt className="text-lg" />
                  </p>
                  <p className="text-[16px] leading-[150%] text-[#fafafa] roboto text-center">Uploading image...</p>
              </> ) }
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
              className="hidden"
            />
          </div>
        </div>
        </div>
        {errors.picture && <p className="flex gap-4 text-red-500 font-bold items-center">
            <IoIosWarning />
            <span>{errors.picture}</span>
          </p>}
      <div className="h-[4px] bg-[#07373f] w-full"></div>
      <form className="flex flex-col gap-[12px] text-[#fafafa]">
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="name" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Enter your name</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} placeholder="John Doe" className="w-full flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f] text-white" />
          {errors.name && <p className="flex gap-4 text-red-500 font-bold items-center">
              <IoIosWarning />
              <span>{errors.name}</span>
            </p>}
        </div>
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="email" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Enter your email</label>
          <div className="text-white flex gap-[4px]">
            <IoMdMail />
            <input name="email" type="email" id="email" onChange={handleChange} value={formData.email} placeholder="hello@avioflagoc.io" className="w-full flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f] text-white" />
            </div>
            {errors.email && <p className="flex gap-4 text-red-500 font-bold items-center">
                <IoIosWarning />
                <span>{errors.email}</span>
              </p>}
        </div>
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="request" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Special request?</label>
          <textarea name="request" id="request" value={formData.request} onChange={handleChange} className="w-full h-[127px] flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f] text-white"></textarea>
        </div>
      </form>
      <div className={`flex flex-col lg:flex-row-reverse gap-[16px] lg:gap-[24px]`}>
        <button onClick={() => handleSave()} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#24a0b5] text-white leading-[150%] justify-center cursor-pointer transition-all ease-in-out duration-200 hover:bg-[#0e4048] hover:font-bold hover:shadow-md">Get My {formData.type} Ticket</button>
        <button onClick={() => setTab(1)} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#24a0b5] text-[#24a0b5] leading-[150%] justify-center cursor-pointer hover:font-bold hover:border-[2px] transition-all ease-in-out duration-200">Back</button>
      </div>
      </section>
      {/* mobile view */}
       <div className="sm:hidden flex flex-col gap-[32px] py-[16px] px-[24px] md:pt-[24px] md:pb-[48px] rounded-[24px] border-[1px] border-[#07373f] bg-[#052228] justify-between">
        <h3 className="text-[16px] leading-[150%] text-[#fafafa] roboto">Upload Profile Photo</h3>
          <div className="w-[240px] h-[240px] flex flex-col gap-[16px] p-[24px] rounded-[32px] bg-[#0e464f] border-[#24a0b580] border-[4px] items-center justify-center">
            <img src="./cloud-download.png" alt="" />
            <p className="text-[16px] leading-[150%] text-[#fafafa] roboto text-center">Drag & drop or click to upload</p>
          </div>
        </div>
      <div className="md:hidden h-[4px] bg-[#07373f] w-full"></div>
      <form className="sm:hidden flex flex-col gap-[12px] text-[#fafafa]">
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="name" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Enter your name</label>
          <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} placeholder="John Doe" className="w-full flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f]" />
          {errors.name && <p className="flex gap-4 text-red-500 font-bold items-center text-white">
              <IoIosWarning />
              <span>{errors.name}</span>
            </p>}
        </div>
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="email" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Enter your email</label>
          <div>
            <input name="email" type="email" id="email" onChange={handleChange} value={formData.email} placeholder="hello@avioflagoc.io" className="w-full flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f] text-white" />
            </div>
            {errors.email && <p className="flex gap-4 text-red-500 font-bold items-center">
                <IoIosWarning />
                <span>{errors.email}</span>
              </p>}
        </div>
        <div className="flex flex-col gap-[8px] text-[#fafafa]">
          <label htmlFor="request" className="text-[16px] roboto leading-[150%] text-[#fafafa]">Special request?</label>
          <textarea name="request" id="request" value={formData.request} onChange={handleChange} className="w-full h-[127px] flex gap-8 p-[12px] rounded-[12px] border-[1px] border-[#07373f] text-white"></textarea>
        </div>
      </form>
      <div className={`sm:hidden flex flex-col lg:flex-row-reverse gap-[16px] lg:gap-[24px]`}>
        <button onClick={() => handleSave()} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] bg-[#24a0b5] text-white leading-[150%] justify-center cursor-pointer transition-all ease-in-out duration-200 hover:bg-[#0e4048] hover:font-bold hover:shadow-md">Get My {formData.type} Ticket</button>
        <button onClick={() => setTab(1)} className="w-full text-center flex gap-[8px] px-[24px] py-[12px] rounded-[8px] border-[1px] border-[#24a0b5] text-[#24a0b5] leading-[150%] justify-center cursor-pointer hover:font-bold hover:border-[2px] transition-all ease-in-out duration-200">Back</button>
      </div>
    </>
  )
}
