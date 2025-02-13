import { createContext, ReactNode, useState, useEffect } from "react";
import { TFormContext, TTicketDetails, TErrors } from "../types/";
import { validateEmail, validateURL } from "../utils/validate";

export const FormContext = createContext<TFormContext | null>(null);

export default function FormContextProvider({ children }: { children: ReactNode }){
  const [formData, setFormData] = useState<TTicketDetails>({} as TTicketDetails);

  useEffect(() => {
    if(localStorage.getItem('formData')){
      const saved = localStorage.getItem('formData') && JSON.parse(localStorage.getItem('formData') as string);
        setFormData(saved);
    }else{
      setFormData({
          type: "Free",
          quantity: 1,
          picture: "",
          name: "",
          email: "",
          request: ""
    });
    }
  }, [])

  useEffect(() => {
    const isValid = validateURL(formData.picture);

    if(!isValid){
      setErrors(errors => ({ ...errors, picture: "Invalid format. Please provide a URL" }));
      setFormData(formData => ({ ...formData, picture: "" }))
    }
  }, [formData.picture])
  
  const [errors, setErrors] = useState<TErrors>({
    type: "",
    quantity: "",
    picture: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if(key === 'email'){
      const isValid = validateEmail(value);

      if(!isValid){
        setErrors(errors => ({ ...errors, email: "Invalid email!" }));
      }
    }

    setFormData({
      ...formData,
      [key]: key === 'quantity' ? Number(value) : value
    });

    localStorage.setItem('formData', JSON.stringify(formData));
  }

  const reset = () => {
    setFormData({
    type: "Free",
    quantity: 1,
    picture: "",
    name: "",
    email: "",
    request: ""
  })


    localStorage.setItem('formData', JSON.stringify(formData));
  }

  return (
    <FormContext.Provider value={{formData, setFormData, errors, setErrors, handleChange, reset}}>
      { children }
    </FormContext.Provider>
  );
}
