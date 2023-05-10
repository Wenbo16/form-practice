// import React, { createRef } from "react";
// // import Highlighter from "react-highlight-words";
// import { Button } from "antd";
// import Form from "@rjsf/antd";
// import { useAtom } from "jotai";
// import lodash from "lodash";
// import signup_schema from "./signup_schema.json";
// import { formDataAtom } from "./store";

// import styles from "../index.module.css";



// type TProps = {
//   handleSubmit?: () => void;
// };

// const uiSchema = {
//   userName: {
//     "ui:classNames": "custom-class-userName"
//   },
//   certType: {
//     "ui:classNames": "custom-class-certType",
//     "ui:widget": "select"
//   },
//   password: {
//     "ui:widget": "password"
//   },
//   password2: {
//     "ui:widget": "password"
//   },
//   email: {
//     "ui:widget": "email"
//   }
// };

// const Step1: React.FC<TProps> = ({ handleSubmit }) => {
//   const [formData, setFormDataAtom] = useAtom(formDataAtom);
//   const formRef = createRef<any>();

//   return (
//     <div className={styles.formContainer}>
//       <div className={styles.formWrapper}>
//         <Form
//           schema={JSON.parse(JSON.stringify(signup_schema))}
//           uiSchema={uiSchema}
//           formData={formData}
//           onSubmit={(e) => {
            
//           }}
//           onChange={(e, id) => {
//             if (id === "root_password" || id === "root_password2") {
//               formRef.current.validateForm();
//             }
//           }}
//           showErrorList={false}
//           ref={formRef}
//           readonly
//         >
//           <Button
//             htmlType="submit"
//             style={{
//               display: "block",
//               margin: "0 auto",
//               width: "88px",
//               height: "36px",
//               backgroundColor: "#a3c644",
//               color: "#ffffff",
//               fontWeight: 600,
//               marginTop: "45px"
//             }}
//           >
//             Next
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Step1;
