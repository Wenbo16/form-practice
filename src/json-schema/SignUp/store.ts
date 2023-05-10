import { atom } from "jotai";

export type SignupFormData = {
  certType?: {
    "Certification Type": "Passport" | "ID Card" | "";
    Passport?: string;
    "ID Number"?: string;
  };
  email?: string;
  password?: string;
  password2?: string;
  userName?: string;
  bankName?: string;
  cardNumber?: string;
};

const initFormData: SignupFormData = {
  certType: { "Certification Type": "ID Card" },
  email: "",
  password: "",
  password2: "",
  userName: "",
  bankName: "",
  cardNumber: ""
};

export const formDataAtom = atom(initFormData);
