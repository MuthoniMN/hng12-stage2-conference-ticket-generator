import { Dispatch, SetStateAction  } from "react";

export type TTicketDetails = {
  'type': string,
  'quantity': number,
  'name': string,
  'picture': string,
  'email': string,
  'request'?: string
}

export type TErrors = {
  type: string,
  quantity: string,
  name: string,
  picture: string,
  email: string,
}

export type TFormContext = {
  formData: TTicketDetails,
  setFormData: Dispatch<SetStateAction<TTicketDetails>>,
  errors: TErrors,
  setErrors: Dispatch<SetStateAction<TErrors>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>
) => void,
  reset: () => void
}
