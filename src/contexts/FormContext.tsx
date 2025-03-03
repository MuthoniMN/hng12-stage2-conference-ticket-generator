import { createContext, ReactNode, useState, useEffect } from "react";
import { TFormContext, TTicketDetails, TErrors } from "../types/";
import { validateEmail, validateURL } from "../utils/validate";

export const FormContext = createContext<TFormContext>({
  formData: {} as TTicketDetails,
  setFormData: () => {},
  errors: {} as TErrors,
  setErrors: () => {},
  handleChange: () => {},
  reset: () => {}
});

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>
) => {
    const key = e.target.name;
    const value = e.target.value;

    if(key === 'email'){
      const isValid = validateEmail(value);

      if(!isValid){
        setErrors(errors => ({ ...errors, email: "Invalid email!" }));
      }
    }

    const updated = {
      ...formData,
      [key]: key === 'quantity' ? Number(value) : value
    };

    setFormData(updated);

    localStorage.setItem('formData', JSON.stringify(updated));
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


    localStorage.setItem('formData', '');
  }

  return (
    <FormContext.Provider value={{formData, setFormData, errors, setErrors, handleChange, reset}}>
      { children }
    </FormContext.Provider>
  );
}
