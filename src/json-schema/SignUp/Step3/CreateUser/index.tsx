import React, { useEffect } from "react";
import { SignupFormData } from "../../store";

type TProps = {
  formData: SignupFormData;
  tradePas: string;
  onError: () => void;
  onSucc: () => void;
};

export const CreateUser = (props: TProps) => {
  const { formData, tradePas, onError, onSucc } = props;

  const createUser = async () => {
    const {
      certType,
      email = "",
      userName = "",
      bankName = "",
      cardNumber = ""
    } = formData;
    const cert = certType?.["Certification Type"] ?? "";
    let idNumber = "";
    if (cert === "ID Card") {
      idNumber = certType?.["ID Number"] ?? "";
    } else if (cert === "Passport") {
      idNumber = certType?.Passport ?? "";
    }
    console.log('create user')
  };

  useEffect(() => {
    createUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
