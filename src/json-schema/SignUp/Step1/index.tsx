import React, { createRef } from "react";
// import Highlighter from "react-highlight-words";
import { Button } from "antd";
import Form from "@rjsf/antd";
import { FormValidation, RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useAtom } from "jotai";
import lodash from "lodash";
import signup_schema from "../signup_schema.json";
import { formDataAtom } from "../store";

import styles from "../index.module.css";

interface IFormData {
  userName: string;
  certType: {
    "Certification Type": string;
    "ID Number": string;
  };
  email: string;
  password: string;
  password2: string;
}

type TProps = {
  handleSubmit?: () => void;
};

const step1_schema = JSON.parse(JSON.stringify(signup_schema))["step1"];

function customValidate(
  formData: IFormData,
  errors: FormValidation<RJSFSchema>
) {
  const userNamePattern = /^[a-zA-Z0-9_ -]{2,32}$/;
  if (!userNamePattern.test(formData.userName)) {
    errors.userName?.addError(
      "Your username should be in 2~32. you can have number, letters, - and _ and space."
    );
  }
  if (formData.email) {
    if (!formData.email?.includes("@") || formData.email.length > 30)
      errors.email?.addError(
        "Your mail address is not valid, please enter a new one!"
      );
  }

  //Cert type validation
  const currentCertType = lodash.get(
    formData,
    `certType['Certification Type']`
  );
  const idNumberPattern = /^[0-9X]{18}$/;
  if (
    currentCertType === "ID Card" &&
    !idNumberPattern.test(formData.certType["ID Number"])
  ) {
    errors.certType?.addError("Please check your ID number.");
  }

  const passwordPattern =
    /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/;
  if (!passwordPattern.test(formData.password)) {
    errors.password?.addError(
      "Your password should be in 8-32 characters and including at least 3 of followings: upper letter, lower letter, number, special character."
    );
  }
  if (formData.password !== formData.password2) {
    errors.password2?.addError(
      "Your password is inconsistent, please check and re-enter."
    );
  }
  return errors;
}

const uiSchema = {
  userName: {
    "ui:classNames": "custom-class-userName"
  },
  certType: {
    "ui:classNames": "custom-class-certType",
    "ui:widget": "select"
  },
  password: {
    "ui:widget": "password"
  },
  password2: {
    "ui:widget": "password"
  },
  email: {
    "ui:widget": "email"
  }
};

const Step1: React.FC<TProps> = ({ handleSubmit }) => {
  const [formData, setFormDataAtom] = useAtom(formDataAtom);
  const formRef = createRef<any>();

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <Form
          schema={step1_schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={(e) => {
            const newFormData = lodash.cloneDeep(e.formData);
            const certType = lodash.get(
              e.formData,
              `certType['Certification Type']`
            );
            const submittedFormData =
              certType === "Passport"
                ? lodash.omit(newFormData, `certType['ID Number']`)
                : lodash.omit(newFormData, `certType['Passport']`);
            setFormDataAtom(submittedFormData);
            handleSubmit && handleSubmit();
          }}
          onChange={(e, id) => {
            if (id === "root_password" || id === "root_password2") {
              formRef.current.validateForm();
            }
          }}
          validator={validator}
          customValidate={customValidate}
          showErrorList={false}
          ref={formRef}
          readonly
        >
          <Button
            htmlType="submit"
            style={{
              display: "block",
              margin: "0 auto",
              width: "88px",
              height: "36px",
              backgroundColor: "#a3c644",
              color: "#ffffff",
              fontWeight: 600,
              marginTop: "45px"
            }}
          >
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Step1;
