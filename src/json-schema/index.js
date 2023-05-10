import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/antd";
import { useState } from "react";
import styles from "./index.module.css";

const schema = {
  type: "object",
  required: ["userName", "certType", "password", "email"],
  properties: {
    userName: { type: "string", title: "User Name" },
    certType: {
      title: "",
      $ref: "#/definitions/certTypeConditional",
    },
    password: {
      type: "string",
      title: "Password",
    },
    email: {
      type: "string",
      title: "Email",
    },
  },

  definitions: {
    certTypeConditional: {
      type: "object",
      properties: {
        "Certification Type": {
          type: "string",
          enum: ["ID card", "Passport"],
          default: "",
        },
      },
      required: ["Certification Type"],
      dependencies: {
        "Certification Type": {
          oneOf: [
            {
              properties: {
                "Certification Type": {
                  enum: ["ID card"],
                },
                "ID Number": {
                  title: "ID Number",
                  type: "string",
                },
              },
              required: ["ID Number"],
            },
            {
              properties: {
                "Certification Type": {
                  enum: ["Passport"],
                },
                Passport: {
                  title: "Passport Number",
                  type: "string",
                },
              },
              required: ["Passport"],
            },
          ],
        },
      },
    },
  },
};

const CustomSelectComponent = (props) => {
  return (
    <select>
      {props.value.map((item, index) => (
        <option key={index} id="custom-select">
          {item}
        </option>
      ))}
    </select>
  );
};

// const schema = {
//   type: "array",
//   title: "A multiple-choice list",
//   items: {
//     type: "string",
//   },
// };

const uiSchema = {
  "ui:widget": "CustomSelect",
};

const widgets = {
  CustomSelect: CustomSelectComponent,
};

const initFormData = {
  userName: "",
  certType: "",
};

// const uiSchema = {
//   userName: {
//     "ui:classNames": "custom-class-userName",
//   },
//   certType: {
//     "ui:classNames": "custom-class-certType",
//     "ui:widget": "select",
//   },
//   password: {
//     "ui:widget": "password",
//   },
//   email: {
//     "ui:widget": "email",
//   },
// };
export default function JSONSchemaForm() {
  const [formData, setFormData] = useState(initFormData);

  return (
    <div style={{ width: "600px", height: "800px", margin: "20px auto" }}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        // formData={formData}
        onChange={(e) => console.log(e)}
        validator={validator}
      />
    </div>
  );
}
