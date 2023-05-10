import React, { SyntheticEvent, useState } from "react";
import { Button, Row } from "antd";
import Form from "@rjsf/antd";
import { IChangeEvent } from "@rjsf/core";
import {
  ErrorTransformer,
  RegistryWidgetsType,
  UiSchema,
  WidgetProps
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useAtom } from "jotai";

import signup_schema from "../signup_schema.json";
import { formDataAtom, SignupFormData } from "../store";

import styles from "../index.module.css";

const uiSchema: UiSchema = {
  "ui:rootFieldId": "bankform",
  cardNumber: {
    "ui:widget": "customCreditInputWidget",
    "ui:classNames": "bankform-cardNumber"
  },
  bankName: {
    "ui:classNames": "bankform-bankName"
  }
};

type IFormData = Pick<SignupFormData, "bankName" | "cardNumber">;

const step2_schema = JSON.parse(JSON.stringify(signup_schema))["step2"];

const transformErrors: ErrorTransformer<IFormData> = (errors) => {
  return errors.map((error) => {
    if (error.name === "minLength" && error.property?.includes("cardNumber")) {
      error.message = " The bank card should be 16 numbers, please re-input.";
    }

    if (error.name === "maxLength" && error.property?.includes("bankName")) {
      error.message = "The bank name exceed the maximum length.";
    }

    if (error.name === "required" && error.property?.includes("bankName")) {
      error.message = "Please fill in the bank name, or Skip to next step.";
    }

    if (error.name === "required" && error.property?.includes("cardNumber")) {
      error.message =
        "Please fill in the debit card number, or Skip to next step.";
    }

    if (error.name === "type" && error.property?.includes("cardNumber")) {
      error.message =
        "Please fill in the debit card number, or Skip to next step.";
    }

    return error;
  });
};

const CustomCreditInputWidget = function (props: WidgetProps) {
  const [currVal, setCurrVal] = useState("");
  return (
    <input
      data-testid="bankform_cardNumber"
      className="ant-input-affix-wrapper"
      inputMode="numeric"
      maxLength={19}
      placeholder="xxxx xxxx xxxx xxxx"
      value={currVal}
      required={props.required}
      onChange={(event) => {
        const {
          target: { value }
        } = event;
        const matchedNumArr = value?.match(/[0-9]{1,4}/g);
        setCurrVal(matchedNumArr?.join(" ") || "");
        props.onChange(matchedNumArr?.join("") || null);
      }}
    />
  );
};

const widgets: RegistryWidgetsType = {
  customCreditInputWidget: CustomCreditInputWidget
};

type Props = {
  handleSubmit?: (step: 1 | 3) => void;
};

const Step2: React.FC<Props> = ({ handleSubmit }) => {
  const [isError, setIsError] = useState(false);
  const [formData, setFormDataAtom] = useAtom(formDataAtom);

  const onSkip = () => {
    handleSubmit?.(3);
  };

  const onBack = () => {
    handleSubmit?.(1);
  };

  const onSubmit = (
    { formData }: IChangeEvent<IFormData>,
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isEmpty =
      !formData?.bankName?.length || !formData?.cardNumber?.length;

    setIsError(isEmpty);

    if (isEmpty) return;

    setFormDataAtom(formData!);
    handleSubmit?.(3);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <div
          className={styles.highlightWord}
          data-testid="signup_step2_text_instruction"
        >
          Please enter your bank account details below,and you can manage your
          account under
          <span className={styles.highlightSecondary}>&nbsp;FUND&nbsp;</span>
          tab. Fields marked without an asterisk * are optional.&nbsp;
          <span
            data-testid="signup_step2_button_skip"
            onClick={onSkip}
            className={`${styles.highlightPrimary} ${styles.asButton}`}
          >
            Skip-&gt;
          </span>
          &nbsp;to next step.
        </div>
        <Form
          schema={step2_schema}
          uiSchema={uiSchema}
          formData={formData}
          widgets={widgets}
          onSubmit={onSubmit}
          liveValidate
          validator={validator}
          transformErrors={transformErrors}
          showErrorList={false}
          noHtml5Validate
        >
          {isError && <Step2Error />}
          <Row justify="space-around">
            <Button
              htmlType="submit"
              style={{
                display: "block",
                width: "88px",
                height: "36px",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#a3c644"
              }}
              data-testid="signup_step2_button_next"
            >
              Next
            </Button>
            <Button
              onClick={onBack}
              style={{
                display: "block",
                width: "88px",
                height: "36px",
                fontWeight: 600
              }}
              data-testid="signup_step2_button_back"
            >
              Back
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default Step2;

const Step2Error = () => (
  <Row className={styles.error} data-testid="signup_step2_warning_msg">
    Please fill in the Bank and Debit Card Number, or Skip to next step.
  </Row>
);
